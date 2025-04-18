<template>
    <div class="home-container">
        <HeadNav />
        <div class="table-container">
            <table class="user-table">
                <thead>
                    <tr class="table-header-row">
                        <th v-for="(header, index) in tableHeaders" :key="index" class="table-header-cell">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in paginatedData" :key="user.id" class="table-row">
                        <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.role }}</td>
                        <td>{{ user.registerDate }}</td>
                        <td>
                            <button class="edit-btn" @click="editUser(user.id)">编辑</button>
                            <button class="delete-btn" @click="deleteUser(user.id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 分页组件 -->
            <!-- <div class="pagination">
                <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }"
                    @click="currentPage = page">
                    {{ page }}
                </button>
            </div> -->
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/headNav.vue';
export default {
    components: {
        HeadNav
    },
    data() {
        return {
            tableHeaders: ['序号', '用户名', '角色', '注册时间', '操作'],
            currentPage: 1,
            pageSize: 10,
            users: [
                // 示例数据
                { id: 1, username: '张三', role: '管理员', registerDate: '2024-01-01' },
                { id: 2, username: '李四', role: '普通用户', registerDate: '2024-01-02' }
            ]
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.users.length / this.pageSize);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.users.slice(start, end);
        }
    },
    methods: {
        editUser(id) {
            console.log('编辑用户:', id);
        },
        deleteUser(id) {
            console.log('删除用户:', id);
        }
    }
}
</script>

<style scoped>
.home-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.1);
}

.home-container> :not(.head-nav) {
    height: 80vw;
    width: 100vw;
    background-color: rgba(255, 255, 255, 0.1);
    /* 根据 HeadNav 的实际高度调整 */
}

.table-container {
    margin-top: 20px;
    overflow-x: auto;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.table-header-row {
    border-top: 1px solid rgb(0, 0, 0);
    border-right: 1px solid rgb(0, 0, 0);
    border-left: 1px solid rgb(0, 0, 0);
}

.table-header-cell {
    padding: 12px;
    color: #fff;
    text-align: center;
}

.table-row {
    border: 1px solid rgb(0, 0, 0);
    text-align: center;
    transition: background-color 0.2s;
}

.table-row:hover {
    /* border-color: #667eea; */
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    background: rgba(255, 255, 255, 0.2);
}

.table-row td {
    color: #fff;
    border: none;
    padding: 12px;
}

.edit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    margin-right: 8px;
    cursor: pointer;
}

.delete-btn {
    background-color: #f44336;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
    display: flex;
    gap: 8px;
}

.pagination button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
}

.pagination button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

@media (max-width: 768px) {
    .table-container {
        margin: 10px;
    }

    .user-table {
        font-size: 14px;
    }
}
</style>