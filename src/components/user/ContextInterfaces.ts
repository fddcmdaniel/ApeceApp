import { createContext } from 'react';

export const DefaultModule = {
  id: "-1",
  title: "",
  description: "",
  enable: true,
  url: "",
  alreadyDone: false,
  result: 0
}

export const DefaultQuestion = {
  id: -1,
  question: "",
  enable: 1,
  moduleId: -1
}

export const DefaultAnswer = {
  id: -1,
  answer: "",
  enable: true,
  correct: false,
  questionId: -1,
  key: -1
}

// export const DefaultResult = [{
//   questionId: "",
//   answerId: ""
// }]

export type IQuestion = typeof DefaultQuestion;
export type IModule = typeof DefaultModule;
export type IAnswer = typeof DefaultAnswer;
//export type IResult = typeof DefaultResult;

export interface IResult {
  question_id: string,
  answer_id: string
}

export interface QuestionProps {
  questions: IQuestion;
  setQuestions: (question: IQuestion) => void;
}

export interface AnswerProps {
  questionId: string;
  isSelected?: boolean;
  setIsSelected?: (s: boolean) => {};
}

export interface IQuizContext {
  selectedQuestion: string,
  setSelectedQuestion: (s: string) => void;
}

export const QuizContext = createContext<IQuizContext>({
  selectedQuestion: "",
  setSelectedQuestion: () => { },
});

export interface IUserModulesContext {
  modules?: IModule;
  setModules?: (modules: IModule[]) => void;
  moduleId?: string;
  setModuleId?: (id: string) => void;
  questionId?: string;
  setQuestionId?: (id: string) => void;
}

export const UserModuleContext = createContext<IUserModulesContext>({
  modules: DefaultModule,
  setModules: () => { },
  moduleId: "",
  setModuleId: () => { },
  questionId: "",
  setQuestionId: () => { }
});