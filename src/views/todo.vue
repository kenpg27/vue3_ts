<template>
  <div class="todo">
    <div class="todo-form">
      <div class="todo-input">
        <input @keyup.enter="handleAddList" v-model="contentRef" type="text" placeholder="请输入事项内容" />
      </div>
      <button type="button" @click="handleAddList">添加事项</button>
    </div>
    <ul class="list" v-if="listRev.length">
      <li class="list-item" v-for="(item,index) of listRev" :id="item.id" :key="item.id">
        <div class="item-label" :class="item.status?'done':''">{{item.title}}</div>
        <div class="action-btn">
          <button class="success" v-if="!item.status" @click="handleStatusChange(index,true)">完成</button>
          <button class="reset" v-if="item.status" @click="handleStatusChange(index,false)">激活</button>
          <button class="delete" @click="handleRemove(index)">删除</button>
        </div>
      </li>
    </ul>
    <p v-else>暂无待办事项..</p>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watchEffect } from "vue";

// 事项接口
interface IList {
  id: number;
  title: string;
  status: boolean;
}
export default {
  setup() {
    let listRev = reactive<Array<IList>>([]);
    let contentRef = ref<string | null>(null);
    let idRef = ref<number>(0);
    // 事项添加
    const handleAddList = () => {
      if (!contentRef.value) return alert("请输入事项内容");
      if (listRev.find((item) => item.title === contentRef.value)) {
        return alert("该事项已存在，请输入其他事项吧~");
      }
      listRev.push({
        title: contentRef.value,
        id: ++idRef.value,
        status: false,
      });
      contentRef.value = "";
    };

    // 事项完成
    const handleStatusChange = (index: number, status: boolean) => {
      listRev[index].status = status;
    };

    // 事项删除
    const handleRemove = (index: number) => {
      listRev.splice(index, 1);
    };
    const count = ref(0);
    const add = () => count.value++;

    watchEffect(() => {
      console.log("contentRef changed", contentRef.value);
    });
    return {
      listRev,
      contentRef,
      handleAddList,
      handleStatusChange,
      handleRemove,
    };
  },
};
</script>

<style lang="scss">
button {
  border-width: 0px;
  border-radius: 3px;
  background: #1e90ff;
  cursor: pointer;
  outline: none;
  font-family: Microsoft YaHei;
  color: white;
  font-size: 14px;
}
.todo {
  padding: 5vw;
  .todo-form {
    display: flex;
    justify-content: space-between;
    .todo-input {
      width: 75%;
      text-align: left;
      input {
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px 0px;
        border-radius: 3px;
        padding-left: 5px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      }
      input:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
          0 0 8px rgba(102, 175, 233, 0.6);
      }
    }
    button {
      width: 20%;
      font-size: 12px;
    }
    button:active {
      background: #5599ff;
    }
  }
  .list {
    text-align: left;
    vertical-align: top;
    background: #fff;
    color: rgb(30, 144, 255);
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    margin-top: 30px;
    .list-item {
      list-style: none;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .item-label {
        width: 80%;
      }
      .action-btn {
        width: 15%;
        button {
          margin: 0px 3px 5px;
          font-size: 12px;
          padding: 3px 7px;
        }
        .success {
          background-color: #009688;
        }
        .delete {
          background-color: #e91e63;
        }
        .reset {
          background-color: #03a9f4;
        }
      }
    }
    .list-item:last-of-type {
      border-bottom: none;
    }
    .done {
      text-decoration: line-through;
      color: #ddd;
    }
  }
}
</style>