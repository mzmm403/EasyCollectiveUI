import Message from "./methods";
import { withInstallFunction } from "@easy-collective-ui/utils";

export const EcMessage = withInstallFunction(Message, "$message");

export * from "./types";
