<template>
    <div class="head-nav">
        <!-- 左侧 Logo 和导航链接 -->
        <div class="left-content">
            <div class="logo">
                <img src="../assets/vue.svg" alt="Logo" />
            </div>
            <ul class="nav-links">
                <li v-for="link in navLinks" :key="link.name">
                    <router-link :to="link.path">{{ link.name }}</router-link>
                </li>
            </ul>
        </div>

        <!-- 中间搜索框 -->
        <div class="search-box">
            <div class="input-wrapper">
                <input v-model="searchQuery" type="text" placeholder="搜索..." class="input-field"
                    @keyup.enter="handleSearch" />
                <svg v-show="searchQuery.trim().length > 0" @click="clearSearch" xmlns="http://www.w3.org/2000/svg"
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <img src="/img/search.svg" alt="">
        </div>

        <!-- 右侧内容 -->
        <div class="right-content">
            <div class="user-info" v-if="user">
                <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
                <span class="username">{{ user.username }}</span>
                <button class="logout-btn" @click="logout">登出</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            navLinks: [
                { name: '首页', path: '/home' },
                { name: '用户管理', path: '/userManage' },
            ],
            user: null
        };
    },
    methods: {
        clearSearch() {
            this.searchQuery = '';
        },
        handleSearch() {
            // 处理搜索逻辑
            console.log('Search query:', this.searchQuery);
        },
        fetchUserInfo() {
            // 模拟获取用户信息的API调用
            this.user = {
                username: 'JohnDoe',
                avatar: './src/assets/vue.svg'
            };
        }
    },
    created() {
        this.fetchUserInfo();
    }
};
</script>

<style scoped>
.head-nav {
    min-height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.5);
    /* 增加背景透明度 */
}

.left-content {
    display: flex;
    align-items: center;
    gap: 20px;
    /* 增加间距 */
}

.logo img {
    width: 30px;
    /* 调整 Logo 大小 */
    height: 30px;
    border-radius: 50%;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;
    /* 增加链接间距 */
}

.nav-links a {
    text-decoration: none;
    color: #ffffff;
    font-size: 15px;
    /* 调整字体大小 */
    font-weight: bold;
}

.search-box {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 8px 5px;
    background: rgba(255, 255, 255, 0.6);
}

.search-box img {
    width: 20px;
    height: 20px;
    margin: 0 10px;
}

.input-wrapper {
    position: relative;
    width: 100%;
}

.search-box svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.search-box svg:hover {
    stroke: #666;
    transform: translateY(-50%) scale(1.1);
    transition: all 0.2s ease;
}

.input-field {
    width: 100%;
    padding: 5px 35px 5px 5px;
    /* border: 2px solid #e2e8f0; */
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
}

.input-field:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    background: rgba(255, 255, 255, 0.2);
}

.right-content {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 增加间距 */
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 增加间距 */
}

.user-avatar {
    width: 30px;
    /* 调整头像大小 */
    height: 30px;
    border-radius: 50%;
}

.username {
    margin-right: 10px;
    /* 调整间距 */
    color: #ffffff;
    font-size: 16px;
    /* 调整字体大小 */
}

.logout-btn {
    padding: 5px 10px;
    /* 增加内边距 */
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #fff;
    /* 添加边框 */
    border-radius: 5px;
    /* 圆角 */
    cursor: pointer;
    font-size: 16px;
    /* 调整字体大小 */
}

/* 添加自适应样式 */
@media (max-width: 768px) {
    .head-nav {
        flex-direction: row;
        padding: 10px;
    }

    .left-content {
        flex-direction: row;
        /* 保持行内排列 */
        justify-content: center;
        margin-bottom: 10px;
    }

    .nav-links {
        flex-direction: row;
        /* 保持行内排列 */
        justify-content: center;
    }

    .nav-links li {
        margin: 0 10px;
    }

    .search-box {
        width: 100%;
        margin: 10px 0;
    }

    .right-content {
        justify-content: center;
        margin-top: 10px;
    }
}
</style>