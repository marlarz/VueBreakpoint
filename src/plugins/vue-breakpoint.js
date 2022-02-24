import { reactive } from 'vue';

const thresholds = {
  xs: 425,
  sm: 768,
  md: 1024,
  lg: 1200
};

export default {
  width: 0,
  height: 0,
  thresholds,
  breakpoints: reactive({
    xsOnly: false,
    smOnly: false,
    mdOnly: false,
    lgOnly: false,
    xlOnly: false,
    smAndDown: false,
    mdAndDown: false,
    lgAndDown: false,
    smAndUp: false,
    mdAndUp: false,
    lgAndUp: false
  }),
  install (app, options = {}) {
    const version = Number(app.version.split('.')[0]);

    if (version < 3) {
      console.warn('VueBreakpoint requires Vue 3');
      return;
    }

    options = Object.assign(thresholds, options);
    app.config.globalProperties.$breakpoint = this.breakpoints;
    this.resizeEvent();
    window.addEventListener('resize', this.resizeEvent.bind(this), { passive: true });
  },
  resizeEvent () {
    const { innerHeight, innerWidth } = window;
    this.width = innerWidth;
    this.height = innerHeight;
    this.update();
  },
  update () {
    const { width, thresholds, breakpoints } = this;

    const xs = width < thresholds.xs;
    const sm = width < thresholds.sm && !xs;
    const md = width < thresholds.md && !(xs || sm);
    const lg = width < thresholds.lg && !(xs || sm || md);
    const xl = width >= thresholds.lg;

    breakpoints.xsOnly = xs;
    breakpoints.smOnly = sm;
    breakpoints.mdOnly = md;
    breakpoints.lgOnly = lg;
    breakpoints.xlOnly = xl;

    breakpoints.smAndDown = (xs || sm) && !(md || lg || xl);
    breakpoints.mdAndDown = (xs || sm || md) && !(lg || xl);
    breakpoints.lgAndDown = (xs || sm || md || lg) && !xl;

    breakpoints.smAndUp = (sm || md || lg || xl) && !xs;
    breakpoints.mdAndUp = (md || lg || xl) && !(xs || sm);
    breakpoints.lgAndUp = (lg || xl) && !(xs || sm || md);
  }
};
