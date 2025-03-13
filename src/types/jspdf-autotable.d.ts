declare module 'jspdf-autotable' {
    import { jsPDF } from 'jspdf';
  
    interface UserOptions {
      head?: any[][];
      body?: any[][];
      foot?: any[][];
      startY?: number;
      margin?: any;
      pageBreak?: 'auto' | 'avoid' | 'always';
      rowPageBreak?: 'auto' | 'avoid' | 'always';
      tableWidth?: 'auto' | 'wrap' | number;
      showHead?: 'everyPage' | 'firstPage' | 'never';
      showFoot?: 'everyPage' | 'lastPage' | 'never';
      tableLineWidth?: number;
      tableLineColor?: number[];
      theme?: 'striped' | 'grid' | 'plain';
      styles?: any;
      columnStyles?: any;
      headStyles?: any;
      bodyStyles?: any;
      footStyles?: any;
      alternateRowStyles?: any;
      didParseCell?: (data: any) => void;
      didDrawCell?: (data: any) => void;
      didDrawPage?: (data: any) => void;
      [key: string]: any;
    }
  
    interface AutoTableResult {
      finalY?: number;
      pageCount?: number;
      lastAutoTable?: boolean;
      table?: any;
    }
  
    const autoTable: (doc: jsPDF, options: UserOptions) => AutoTableResult;
    
    export default autoTable;
  }