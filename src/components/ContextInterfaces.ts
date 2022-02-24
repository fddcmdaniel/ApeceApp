import { createContext } from 'react';

export const DefaultModule = {
  id: -1,
  key: -1,
  title: "",
  description: "",
  enable: true,
  url: ""
}

export const DefaultQuestion = {
  "id": -1,
  "question": "",
  "enable": 1,
  "moduleId": -1,
  "key": -1
}

export const DefaultAnswer = {
  id: -1,
  answer: "",
  enable: true,
  correct: false,
  questionId: -1,
  key: -1
}

export const DefaultUser = {
  id: -1,
  name: "",
  email: "",
  password: "",
  enable: true,
  is_admin: false
}

export type IQuestion = typeof DefaultQuestion;
export type IModule = typeof DefaultModule;
export type IAnswer = typeof DefaultAnswer;
export type IUser = typeof DefaultUser;

export interface QuestionProps {
  questions: IQuestion;
  setQuestions: (question: IQuestion) => void;
}

export interface AnswerProps {
  answer: IAnswer;
  setAnswer: (answer: IAnswer) => void;
}

export interface ModuleModalProps {
  showModuleModal: boolean;
  setShowModuleModal: (mm: boolean) => void;
  setModules: (modules: IModule[]) => void;
  modalType: boolean;
  module: IModule;
}

export interface QuestionModalProps {
  showQuestionModal: boolean;
  setShowQuestionModal: (mm: boolean) => void;
  setQuestions: (modules: IQuestion[]) => void;
  modalType?: boolean;
  question: IQuestion;
}

export interface AnswerModalProps {
  showAnswerModal: boolean;
  setShowAnswerModal: (mm: boolean) => void;
  setAnswers: (modules: IAnswer[]) => void;
  modalType?: boolean;
  answer: IAnswer;
}

export interface CameraActionSheetProps {
  showCameraActionSheet: boolean;
  setShowCameraActionSheet: (cas: boolean) => void;
  setQuestion?: (q: string) => void;
  setAnswer?: (a: IAnswer) => void;
  answer?: IAnswer;
  actionType: boolean;
  setLoading: (loading: boolean) => void;
}

// export interface LoginAPIProps {
//   user: IUser;
//   setUser: (u: IUser) => void;
//   loggedIn: boolean;
//   setLoggedIn: (lg: boolean) => void;
//   infoUser: string;
//   setInfoUser: (info: string) => void;
// }

export interface IStateLoginContext {
  user: IUser;
  setUser: (u: IUser) => void;
  loggedIn: boolean;
  setLoggedIn: (lu: boolean) => void;
}

export const StateLoginContext = createContext<IStateLoginContext>({
  user: DefaultUser,
  setUser: () => { },
  loggedIn: false,
  setLoggedIn: () => { }
});

export interface ModulesContextInterface {
  modules?: IModule;
  setModules: (modules: IModule[]) => void;
  showModuleModal: boolean;
  setShowModuleModal: (s: boolean) => void;
  moduleId?: string;
  setModuleId?: (id: string) => void;
  enable: boolean,
  setEnable: (e: boolean) => void,
  question: IQuestion;
  setQuestion: (q: IQuestion) => void;
  showModuleActionSheet: boolean;
  setShowModuleActionSheet: (m: boolean) => void;
  showQuestionActionSheet: boolean;
  setShowQuestionActionSheet: (m: boolean) => void;
}

export const ModuleContext = createContext<ModulesContextInterface>({
  modules: DefaultModule,
  setModules: () => { },
  showModuleModal: false,
  setShowModuleModal: () => { },
  showModuleActionSheet: false,
  moduleId: "",
  setModuleId: () => { },
  enable: true,
  setEnable: () => { },
  question: DefaultQuestion,
  setQuestion: () => { },
  setShowModuleActionSheet: () => { },
  showQuestionActionSheet: false,
  setShowQuestionActionSheet: () => { }
});