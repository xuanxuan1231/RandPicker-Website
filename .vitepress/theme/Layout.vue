<script lang="ts">
import { h, defineComponent, nextTick, provide, useSlots } from 'vue'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

let transitionPatched = false

export default defineComponent({
  name: 'CustomLayout',
  setup() {
    const { isDark } = useData()
    const slots = useSlots()
    const router = useRouter()

    const enableTransitions = () =>
      'startViewTransition' in document &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
      if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
      }

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
      ]

      await document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
      }).ready

      document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
          duration: 300,
          easing: 'ease-in',
          fill: 'forwards',
          pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
      )
    })

    // 页面切换时使用 View Transition API
    if (typeof window !== 'undefined' && !transitionPatched) {
      transitionPatched = true
      const originalGo = router.go.bind(router)
      router.go = async (href?: string) => {
        if (!enableTransitions()) {
          return originalGo(href)
        }
        document.documentElement.classList.add('page-transitioning')
        try {
          await document.startViewTransition(() => originalGo(href)).finished
        } finally {
          document.documentElement.classList.remove('page-transitioning')
        }
      }
    }

    // Render DefaultTheme.Layout and forward all received slots so plugins
    // (like the enhanced-readabilities menu) can be injected into the layout.
    return () => h(DefaultTheme.Layout, {}, slots as any)
  },
})
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

/* 页面切换动效 */
.page-transitioning .VPContent {
  view-transition-name: vp-content;
}

/* 页面切换时 root（含 sidebar）立即切换，不残留 */
:root.page-transitioning::view-transition-old(root) {
  animation: none;
  opacity: 0;
  z-index: 0;
}

:root.page-transitioning::view-transition-new(root) {
  animation: none;
  opacity: 1;
  z-index: 0;
}

@keyframes page-fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes page-fade-slide-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

::view-transition-old(vp-content) {
  animation: page-fade-slide-out 0.2s ease forwards;
}

::view-transition-new(vp-content) {
  animation: page-fade-slide-in 0.2s ease forwards;
}
</style>