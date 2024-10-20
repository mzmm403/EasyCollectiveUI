import { makeInstaller } from "@easy-collective-ui/utils";
import commponents from "./commponents";
import '@easy-collective-ui/theme/index.css';

const installer = makeInstaller(commponents);

export * from "@easy-collective-ui/components"
export default installer;