declare module 'parliament-svg' {
    interface Party {
      seats: number;
      color: string;
    }
  
    function parliamentSVG(parties: Record<string, Party>, seatCount: number): {
      svg: string; // Assurez-vous que c'est bien une chaîne de caractères
      innerHTML: string;
    };
  
    export default parliamentSVG;
  }