<template>
  <div>ts编写发布订阅</div>
</template>

<script lang="ts">
// 使用ts编写发布订阅  和观察者模式对比 看出差异

// 定义发布者接口（Publisher）
interface Publisher<T> {
  subscriber: string;
  data: T;
}
// 事件总线接口（EventChannel）
interface EventChannel<T> {
  on: (subscriber: string, callback: () => void) => void;
  off: (subscriber: string, callback: () => void) => void;
  emit: (subscriber: string, data: T) => void;
}
// 订阅者接口（Subscriber）
interface Subscriber{
  subscriber: string;
  callback: () => void;
}

interface PublishData {
  [key: string]: string;
}

class ConcretePublisher<T> implements Publisher<T> {
  public subscriber: string = "";
  public data: T;
  constructor(subscriber: string, data: T) {
    this.subscriber = subscriber;
    this.data = data;
  }
}

class ConcreteEventChannel<T> implements EventChannel<T> {
  // 初始化订阅者对象
  private subjects: { [key: string]: Function[] } = {};

  // 实现添加订阅事件
  public on(subscriber: string, callback: () => void): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    if (!this.subjects[subscriber]) {
      this.subjects[subscriber] = [];
    }
    this.subjects[subscriber].push(callback);
    // console.log(this.subjects);
  }

  // 实现取消订阅事件
  public off(subscriber: string, callback: () => void): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (callback === null) {
      this.subjects[subscriber] = [];
    } else {
      const index: number = this.subjects[subscriber].indexOf(callback);
      ~index && this.subjects[subscriber].splice(index, 1);
    }
  }

  // 实现发布订阅事件
  public emit(subscriber: string, data: T): void {
    console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
    this.subjects[subscriber].forEach((item) => {
      item(data);
    });
  }
}

class ConcreteSubscriber implements Subscriber {
  public subscriber: string = "";
  constructor(subscriber: string, callback: (args?:any[]) => void) {
    this.subscriber = subscriber;
    this.callback = callback;
  }
  public callback(): void {}
}

/* 运行示例 */
const pingan8787 = new ConcreteSubscriber("running", () => {
  console.log("订阅者 pingan8787 订阅事件成功！执行回调~");
});

const leo = new ConcreteSubscriber("swimming", () => {
  console.log("订阅者 leo 订阅事件成功！执行回调~");
});

const lisa = new ConcreteSubscriber("swimming", () => {
  console.log("订阅者 lisa 订阅事件成功！执行回调~");
});

const ken = new ConcreteSubscriber("swimming", (args) => {
  // 打印传参
  console.log(args);
  console.log("订阅者 ken 订阅事件成功！执行回调~");
});

const pual = new ConcretePublisher<PublishData>("swimming", {
  message: "pual 发布消息~",
  name: "pual",
});

const eventBus = new ConcreteEventChannel<PublishData>();
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