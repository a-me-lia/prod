import { createContext } from "react";

type languageCOntaxtType = true | false;

export const LanguageContext = createContext<languageCOntaxtType>(false);
