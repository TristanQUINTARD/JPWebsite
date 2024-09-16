declare module 'parliament-svg' {
    interface Party {
      seats: number;
      color: string;
    }
  
    function parliamentSVG(parties: Record<string, Party>, seatCount: number): {
      svg: SVGElement;
      innerHTML: string;
    };
  
    export default parliamentSVG;
  }