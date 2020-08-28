<template>
  <div>
    <h1>ts编写观察者模式</h1>
  </div>
</template>

<script lang="ts">
import ObserverClass, { Observer, Subject } from "../plugins/Observer";

function useObserver(): void {
  const subject: Subject = new ObserverClass.ConcreteSubject();
  const Zhangsan = new ObserverClass.ConcreteObserver("张三");
  const Lisi = new ObserverClass.ConcreteObserver("李四");
  const Wangwu = new ObserverClass.ConcreteObserver("王五");
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