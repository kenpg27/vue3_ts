
// 发布者接口（ Publisher ）
export interface Publisher<T> {
    subscriber: string;
    data: T;
}
// 事件总线接口（EventChannel）
export interface EventChannel<T> {
    on: (subscriber: string, callback: () => void) => void;
    off: (subscriber: string, callback: () => void) => void;
    emit: (subscriber: string, data: T) => void;
}
// 订阅者接口（Subscriber）
export interface Subscriber {
    subscriber: string;
    callback: () => void;
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
    constructor(subscriber: string, callback: (args?: any[]) => void) {
        this.subscriber = subscriber;
        this.callback = callback;
    }
    public callback(): void { }
}

export default {
    ConcretePublisher,
    ConcreteEventChannel,
    ConcreteSubscriber
}

