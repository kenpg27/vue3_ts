<template>
  <div>ts编写发布订阅</div>
</template>


<script lang="ts">
import Event from '../plugins/Event';
// 使用ts编写发布订阅  和观察者模式对比 看出差异

interface PublishData {
    [key: string]: string;
}
/* 运行示例 */
const pingan8787 = new Event.ConcreteSubscriber("running", () => {
  console.log("订阅者 pingan8787 订阅事件成功！执行回调~");
});

const leo = new Event.ConcreteSubscriber("swimming", () => {
  console.log("订阅者 leo 订阅事件成功！执行回调~");
});

const lisa = new Event.ConcreteSubscriber("swimming", () => {
  console.log("订阅者 lisa 订阅事件成功！执行回调~");
});

const ken = new Event.ConcreteSubscriber("swimming", (args) => {
  // 打印传参
  console.log(args);
  console.log("订阅者 ken 订阅事件成功！执行回调~");
});

const pual = new Event.ConcretePublisher<PublishData>("swimming", {
  message: "pual 发布消息~",
  name: "pual",
});

const eventBus = new Event.ConcreteEventChannel<PublishData>();
eventBus.on(pingan8787.subscriber, pingan8787.callback);
eventBus.on(leo.subscriber, leo.callback);
eventBus.on(lisa.subscriber, lisa.callback);
eventBus.on(ken.subscriber, ken.callback);

// 发布者 pual 发布 "swimming"相关的事件
eventBus.emit(pual.subscriber, pual.data);
eventBus.off(lisa.subscriber, lisa.callback);
eventBus.emit(pual.subscriber, pual.data);
</script>

<style>
</style>