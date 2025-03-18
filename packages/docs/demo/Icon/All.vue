<template>
    <ul class="demo-icon-list">
        <li class="icon-item" v-for="icon in iconList" :key="icon" @click="copy(icon)">
            <span class="demo-svg-icon">
                <span class="icon-container">
                    <EcIcon :icon="icon" style="font-size: 20px"></EcIcon>
                </span>
                <span class="icon-name">{{ icon }}</span>
            </span>
        </li>
    </ul>
</template>

<style scoped>
.demo-icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border-top: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.demo-icon-list .icon-item {
    text-align: center;
    color: gray;
    height: 90px;
    font-size: 13px;
    border-right: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    transition: background-color 0.3s;
}

.demo-icon-list .icon-item .demo-svg-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
}

.icon-name {
    margin-top: 8px;
    height: 40px;
    line-height: 16px;
    width: 80%;
}

.icon-container {
    height: 30px;
    display: flex;
    flex-direction: column-reverse;
}
</style>

<script lang="ts" setup>
import { EcMessage } from "easy-collective-ui";

const copy = (text: any) => {
    // text是复制文本
    // 创建input元素
    text = `<ec-icon icon="${text}"></ec-icon>`;
    const el = document.createElement("input");
    // 给input元素赋值需要复制的文本
    el.setAttribute("value", text);
    // 将input元素插入页面
    document.body.appendChild(el);
    // 选中input元素的文本
    el.select();
    // 复制内容到剪贴板
    document.execCommand("copy");
    // 删除input元素
    document.body.removeChild(el);
    EcMessage.success("已复制");
};

const iconList: string[] = [
    "plus",
    "minus",
    "search",
    "female",
    "male",
    "house",
    "link",
    "star",
    "clock",
    "edit",
    "eye",
    "eye-slash",
    "bell",
    "lock",
    "unlock",
    "image",
    "circle-user",
    "file",
    "camera",
    "calendar",
    "cloud",
    "truck",
    "thumbs-up",
    "thumbs-down",
    "face-smile",
    "headphones",
    "user",
    "check",
    "envelope",
    "download",
    "comment",
    "bars",
    "phone",
    "font-awesome",
    "location-dot",
    "music",
    "heart",
    "arrow-right",
    "arrow-left",
    "arrow-up",
    "arrow-down",
    "circle-xmark",
    "xmark",
    "poo",
    "caret-up",
    "caret-down",
    "caret-left",
    "caret-right",
    "pen-nib",
    "paperclip",
    "shield-halved",
    "cart-shopping",
    "clipboard",
    "filter",
    "circle-info",
    "info",
    "arrow-up-from-bracket",
    "arrow-right-from-bracket",
    "car",
    "bolt",
    "gift",
    "film",
    "umbrella",
    "pen",
    "mug-hot",
    "ghost",
    "list",
    "gear",
    "trash",
    "circle-up",
    "circle-down",
    "circle-right",
    "circle-left",
    "inbox",
    "rotate-right",
    "rotate-left",
    "barcode",
    "tag",
    "book",
    "bookmark",
    "print",
    "font",
    "video",
    "circle-half-stroke",
    "droplet",
    "pen-to-square",
    "share-from-square",
    "share",
    "circle-exclamation",
    "fire",
    "folder",
    "hand",
    "magnet",
    "plane",
    "folder-open",
    "money-bill",
    "comments",
    "lemon",
    "key",
    "thumbtack",
    "gears",
    "paper-plane",
    "code",
    "globe",
    "city",
    "ticket",
    "tree",
    "wifi",
    "paint-roller",
    "bicycle",
    "sliders",
    "brush",
    "hashtag",
    "flask",
    "briefcase",
    "compass",
    "handshake",
    "snowflake",
    "earth-americas",
    "cloud-arrow-down",
    "cloud-arrow-up",
    "binoculars",
    "palette",
    "layer-group",
    "users",
    "gamepad",
    "business-time",
    "feather",
    "sun",
    "bug",
    "fish",
    "shop",
    "landmark",
    "shirt",
    "anchor",
    "quote-left",
    "quote-right",
    "michrophone",
    "volume-high",
    "volume-low",
    "volume-off",
    "volume-xmark",
    "tv",
    "triangle-exclamation",
    "terminal",
    "rss",
    "ellipsis",
]

</script>