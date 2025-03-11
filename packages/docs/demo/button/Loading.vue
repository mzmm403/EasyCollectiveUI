<template>
    <div>
        <ec-button type="primary" loading>Loading</ec-button>
        <ec-button type="primary" loading-icon="circle-notch" loading>Loading</ec-button>
        <ec-button type="primary" loading>
            <template #loading>
                <ec-icon style="margin-right: 6px" icon="star" spin />
            </template>
            Loading
        </ec-button>
    </div>
</template>