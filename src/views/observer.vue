<template>
  <div>
    <h1>ts编写观察者模式</h1>
  </div>
</template>

<script lang="ts">
// 使用ts编写观察者模式
interface Observer {
  update(): void;
}

class ConcreteObserver implements Observer {
  constructor(private name: string) {}
  update(): void {
    // 可以处理其他逻辑
    console.log(`${this.name} has been notified.`);
  }
}

// Subject接口及实现类：
interface Subject {
  // 增加观察者
  addObserver(obj: Observer): void;
  // 删除观察者
  deleteObserver(obj: Observer): void;
  // 通知所有的观察者
  notifyObservers(): void;
  // 自身操作
  selfAction(): void;
}

//
class ConcreteSubject<Subject> {
  private ObserverList: Observer[] = [];
  addObserver(obj: Observer) {
    console.log(obj, " is pushed~~");
    this.ObserverList.push(obj);
  }
  deleteObserver(obj: Observer) {
    console.log(obj, " have deleted~~");
    const idx: number = this.ObserverList.indexOf(obj);
    ~idx && this.ObserverList.splice(idx, 1);
  }
  notifyObservers() {
    console.log("notify all the observers ", this.ObserverList);
    // 通知观察者
    this.ObserverList.forEach((item) => {
      item.update();
    });
  }
  selfAction() {}
}

function useObserver(): void {
  const subject: Subject = new ConcreteSubject();
  const Zhangsan = new ConcreteObserver("张三");
  const Lisi = new ConcreteObserver("李四");
  const Wangwu = new ConcreteObserver("王五");
  subject.addObserver(Zhangsan);
  subject.addObserver(Lisi);
  subject.addObserver(Wangwu);
  subject.notifyObservers();
  subject.deleteObserver(Wangwu);
  subject.notifyObservers();
}
useObserver();
</script>

<style>
</style>