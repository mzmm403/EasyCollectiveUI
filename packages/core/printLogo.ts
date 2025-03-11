export default function () {
    // 如果是生产环境
    if(PROD) {
        const logo = `  
        -------------------------------------                                                                         
         _______  ______  _______  _______ 
        |    ___||      ||   |   ||_     _|
        |    ___||   ---||   |   | _|   |_ 
        |_______||______||_______||_______|
        -------------------------------------
                author： Mzmm403
        `
        const rainbowGradient = `
            background: linear-gradient(135deg, orange 60%, cyan);
            background-clip: text;
            color: transparent;
            font-size: 16px;
            line-height: 1;
            font-family: monospace;
            font-weight: 700;
        `
        console.info(`%c${logo}`, rainbowGradient)
    }else if(DEV){
        // 开发环境
        console.log("[EasyCollectiveUI]: dev mode...")
    }
}