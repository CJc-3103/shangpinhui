<template>
  <!-- <div class="container">
    <div class="wrap"> -->
  <table class="todo-list-table">
    <thead>
      <tr>
        <th>date</th>
        <th>description</th>
        <th>deadline</th>
        <th>comment</th>
        <th>action</th>
      </tr>
      <!-- separate row -->
      <tr class="separate-row">
        <td colspan="5"></td>
      </tr>
    </thead>
    <tbody>
      <!-- daily history -->
      <template v-for="({ date, todoList }, i) in todoHistoryList">
        <template v-for="({ description, deadline, comment }, j) in todoList">
          <tr class="order-list-table_row order-item_content" :key="i + '' + j">
            <!-- date; merged cell -->
            <template v-if="j === 0">
              <td :rowspan="todoList.length">{{ date }}</td>
            </template>
            <!-- todo info -->
            <td>{{ description }}</td>
            <td>{{ deadline }}</td>
            <td>{{ comment }}</td>
            <td><a>Delete</a></td>
          </tr>
          <!-- separate row -->
          <tr
            v-if="j === todoList.length - 1"
            :key="i + '' + j + 'separate'"
            class="separate-row"
          >
            <td colspan="5"></td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
  <!-- </div>
  </div> -->
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      todoHistoryList: [
        {
          date: '2022-1-1',
          todoList: [
            {
              description: 'Learn CSS',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
            {
              description: 'Learn HTML',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
            {
              description: 'Learn JS',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
          ],
        },
        {
          date: '2022-1-1',
          todoList: [
            {
              description: 'Learn CSS',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
            {
              description: 'Learn HTML',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
            {
              description: 'Learn JS',
              deadline: '2022-1-1',
              comment: 'Hello',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 1000px;
  height: 400px;
  display: flex;
  .wrap {
    width: 500px;
    margin: auto;
  }
}
.todo-list-table {
  $border: 1px solid #ccc;
  width: 500px;
  border-collapse: collapse;
  text-align: center;
  tr {
    width: 100%;
    border: $border;
    th,
    td {
      border: $border;
    }
    &.separate-row {
      height: 15px;
      border: none;
      th,
      td {
        border: none;
      }
    }
  }
}
</style>
