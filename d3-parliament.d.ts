import * as d3 from 'd3';

declare global {
  interface Window {
    d3: typeof d3;
  }
}

declare module 'd3-parliament' {
  const parliament: any;
  export default parliament;
}