export interface IData {
  categoryN: string;
  icon: React.ReactNode;
  actualData: {
    id: string;
    title: string;
    description: string;
    url: string;
    isCompleted: boolean;
  }[];
}

export interface INew {
  categoryN: string;
  icon: string;
  datas: {
    id: string;
    title: string;
    description: string;
    url: string;
    isCompleted: boolean;
  }[];
}

export interface IData2 {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  isCompleted: boolean;
}
