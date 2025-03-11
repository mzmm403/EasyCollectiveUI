<template>
    <h2>通过 slot 传入内容</h2>
    <div style="max-width: 600px">
        <ec-alert type="success">Success alert</ec-alert>
        <ec-alert type="info">Info alert</ec-alert>
        <ec-alert type="warning">Warning alert</ec-alert>
        <ec-alert type="danger">Error alert</ec-alert>
    </div>
    <h2>通过 prop 传入内容</h2>
    <div style="max-width: 600px">
        <ec-alert type="success" title="Success alert" />
        <ec-alert type="info" title="Info alert" />
        <ec-alert type="warning" title="Warning alert" />
        <ec-alert type="danger" title="Error alert" />
    </div>
</template>