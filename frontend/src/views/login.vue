<template>
    <div class="login-container">
        <!-- 标题 -->
        <div class="login-header">
            <h1>
                <p>系统</p>
            </h1>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleSubmit">
            <!-- 账号输入框 -->
            <div class="form-group">
                <input id="username" v-model="username" type="text" class="input-field" placeholder="请输入账号"
                    autocomplete="current-password" />
            </div>

            <!-- 密码输入框 -->
            <div class="form-group">
                <div class="input-container">
                    <input id="password" v-model="password" :type="showPassword ? 'password' : 'text'"
                        class="input-field" placeholder="请输入密码" autocomplete="current-password" />
                    <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                        <img :src="showPassword ? '/img/showPassword.png' : '/img/hiddenPassword.png'"
                            alt="显示/隐藏密码图标" /> </button>
                </div>
            </div>

            <!-- 按钮容器 -->
            <div class="button-container">
                <button type="submit" class="login-btn">登录</button>
                <button type="button" class="register-btn" @click="handleRegister">
                    注册
                </button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            username: '', // 账号
            password: '', // 密码
            showPassword: true, // 是否显示密码
        };
    },
    methods: {
        // 提交表单
        handleSubmit() {
            if (!this.username && !this.password) {
                this.$message.error('请输入账号和密码');
            }
            else if (!this.username) {
                this.$message.error('请输入账号');
            }
            else if (!this.password) {
                this.$message.error('请输入密码');
            }
            else {
                // 使用全局的 axiosInstance 发起请求
                this.$axios.post('api/login', { username: this.username, password: this.password })
                    .then(response => {
                        this.$message.success(response.data.message || '登录成功');
                        localStorage.setItem('token', response.data.token);
                        this.$router.push('/home');
                    })
                    .catch(error => {
                        this.$message.error(error.response?.data?.msg || '登录失败');
                    });
            }
        },
        // 切换密码可见性
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        // 处理注册按钮点击
        handleRegister() {
            this.$router.push('/register');
        },
    },
};
</script>

<style scoped>
/* 登录容器 */
.login-container {
    background: rgba(255, 255, 255, 0.6);
    padding: 1.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    width: 100%;
    min-width: 400px;
    max-width: 440px;
    transition: transform 0.3s ease;
}

/* 标题样式 */
.login-header {
    text-align: center;
    margin-bottom: 1rem;
}

.login-header h1 {
    color: #2d3748;
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.login-header p {
    color: #718096;
}

/* 表单元素 */
.form-group {
    margin-bottom: 1rem;
    position: relative;
}

label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #4a5568;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.input-field {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: rgba(255, 255, 255, 0.6);
}

.input-field:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    background: rgba(255, 255, 255, 0.2);
}

.input-container {
    position: relative;
    width: 100%;
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0 4px;
    color: #718096;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-password img {
    width: 20px;
    height: 20px;
}

.toggle-password:hover {
    color: #667eea;
}

/* 按钮容器 */
.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

/* 登录按钮 */
.login-btn {
    width: 40%;
    padding: 14px;
    background: rgb(135, 174, 229, 0.6);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.login-btn:hover {
    background: color-mix(in srgb, rgb(135, 174, 229) 20%, black 80%);
}

/* 注册按钮 */
.register-btn {
    width: 40%;
    padding: 14px;
    background: rgb(128, 129, 130, 0.6);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.register-btn:hover {
    background: color-mix(in srgb, rgb(128, 129, 130) 20%, white 80%);
    color: color-mix(in srgb, rgb(255, 255, 255) 60%, black 40%);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-container {
        padding: 1rem;
        min-width: 300px;
        max-width: 100%;
    }

    .login-header h1 {
        font-size: 1.75rem;
    }

    .input-field {
        padding: 10px 12px;
        font-size: 0.9rem;
    }

    .toggle-password img {
        width: 18px;
        height: 18px;
    }

    .login-btn,
    .register-btn {
        width: 45%;
        padding: 12px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 0.8rem;
        min-width: 280px;
    }

    .login-header h1 {
        font-size: 1.5rem;
    }

    .input-field {
        padding: 8px 10px;
        font-size: 0.8rem;
    }

    .toggle-password img {
        width: 16px;
        height: 16px;
    }

    .login-btn,
    .register-btn {
        width: 48%;
        padding: 10px;
        font-size: 0.8rem;
    }
}

@media (max-width: 320px) {
    .login-container {
        padding: 0.6rem;
        min-width: 260px;
    }

    .login-header h1 {
        font-size: 1.25rem;
    }

    .input-field {
        padding: 6px 8px;
        font-size: 0.75rem;
    }

    .toggle-password img {
        width: 14px;
        height: 14px;
    }

    .login-btn,
    .register-btn {
        width: 50%;
        padding: 8px;
        font-size: 0.75rem;
    }
}
</style>