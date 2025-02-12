import { makeInstaller } from "@easy-collective-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { fas } from "@fortawesome/free-solid-svg-icons"
import commponents from "./commponents";
import '@easy-collective-ui/theme/index.css';

library.add(fas)
const installer = makeInstaller(commponents);

export * from "../components"
export default installer;