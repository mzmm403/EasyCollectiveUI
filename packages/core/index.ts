import { makeInstaller } from "@easy-collective-ui/utils";
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { fas } from "@fortawesome/free-solid-svg-icons"
import commponents from "./commponents";
import printLogo from "./printLogo";
import '@easy-collective-ui/theme/index.css';

printLogo()

library.add(fas)
const installer = makeInstaller(commponents);

export * from "@easy-collective-ui/components"
export * from "@easy-collective-ui/locale"
export default installer;