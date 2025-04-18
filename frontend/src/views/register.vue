<template>
    <div class="register-container">
        <!-- 标题 -->
        <div class="register-header">
            <h2>
                <p>用户注册</p>
            </h2>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleSubmit">
            <!-- 账号输入框 -->
            <div class="form-group">
                <input id="username" v-model="username" type="text" class="input-field" placeholder="请输入账号"
                    autocomplete="username" />
            </div>

            <div class="form-group">
                <input id="phone" v-model="phone" type="text" class="input-field" placeholder="输入电话号码"
                    autocomplete="tel">
            </div>

            <div class="form-group">
                <input id="email" v-model="email" type="text" class="input-field" placeholder="请输入邮箱"
                    autocomplete="email">
            </div>

            <!-- 密码输入框 -->
            <div class="form-group">
                <div class="input-container">
                    <input id="password" v-model="password" :type="showPassword ? 'password' : 'text'"
                        class="input-field" placeholder="请输入密码" autocomplete="new-password" />
                    <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                        <img :src="showPassword ? '/img/showPassword.png' : '/img/hiddenPassword.png'"
                            alt="显示/隐藏密码图标" />
                    </button>
                </div>
            </div>

            <!-- 确认密码输入框 -->
            <div class="form-group">
                <input id="confirmPassword" v-model="confirmPassword" :type="showConfirmPassword ? 'password' : 'text'"
                    class="input-field" placeholder="请输入确认密码" autocomplete="new-password" />
                <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
                    <img :src="showConfirmPassword ? '/img/showPassword.png' : '/img/hiddenPassword.png'"
                        alt="显示/隐藏密码图标" />
                </button>
            </div>

            <!-- 按钮容器 -->
            <div class="button-container">
                <button type="submit" class="register-btn" :disabled="isSubmitting">{{ isSubmitting ? '提交中' : '提交'
                }}</button>
                <button type="button" class="login-btn" @click="goLogin">已有账号?去登录</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: true,
            showConfirmPassword: true,
            isSubmitting: false,
        };
    },
    methods: {
        // 防抖函数
        debounce(fn, delay = 500) {
            let timer = null
            return (...args) => {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => fn.apply(this, args), delay)
            }
        },
        handleSubmit() {
            // 注册表单提交逻辑
            if (!this.username || !this.password || !this.confirmPassword) {
                this.$message.error('请输入完整信息');
                return;
            }
            if (this.password !== this.confirmPassword) {
                this.$message.error('两次输入的密码不一致');
                return;
            }

            const debouncedRequest = this.debounce(() => {
                if (this.isSubmitting) { return; }
                this.isSubmitting = true;

                this.$axios.post('api/register', {
                    username: this.username,
                    phone: this.phone,
                    email: this.email,
                    password: this.confirmPassword
                }).then(response => {
                    console.log(response);
                    // 路由使页面跳转(跳转页面暂未创建)
                    if (response.data.code == 201) {
                        this.$message.success(response.data.message || '注册成功');
                        // 延迟跳转让用户看到提示
                        setTimeout(() => this.$router.push('/login'), 1500);
                    }
                }).catch(error => {
                    console.log(error);
                    switch (error.response.status) {
                        case 400:
                            this.$message.warning(error.response.data.error);
                            break;
                        case 409: // 数据冲突
                            this.$message.error(error.response.data.error);
                            // 高亮冲突字段
                            if (error.response.error.includes('用户名')) this.$refs.username.focus();
                            if (error.response.error.includes('手机')) this.$refs.phone.focus();
                            if (error.response.error.includes('邮箱')) this.$refs.email.focus();
                            break;
                        case 500:
                            this.$message.warning(error.response.data.error);
                            break;
                        default:
                            this.$message.error('未知响应状态');
                    }

                    this.$message.error(error.response?.data?.msg || '注册失败');
                }).finally(() => {
                    this.isSubmitting = false;
                })
            }, 500)
            debouncedRequest();
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        toggleConfirmPasswordVisibility() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        // 跳转到登录页
        goLogin() {
            this.$router.push('/login');
        },
    },
};
</script>

<style scoped>
.register-container {
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
.register-header {
    text-align: center;
    margin-bottom: 1rem;
}

.register-header h2 {
    color: #2d3748;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
}

.register-header p {
    color: #718096;
}

/* 表单元素 */
.form-group {
    margin-bottom: 1rem;
    position: relative;
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

/* 注册按钮 */
.register-btn {
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

.register-btn:hover {
    background: color-mix(in srgb, rgb(135, 174, 229) 20%, black 80%);
}

/* 登录按钮 */
.login-btn {
    width: 40%;
    padding: 14px;
    background: rgb(128, 129, 130, 0.6);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.login-btn:hover {
    background: color-mix(in srgb, rgb(128, 129, 130) 20%, white 80%);
    color: color-mix(in srgb, rgb(255, 255, 255) 60%, black 40%);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .register-container {
        padding: 1rem;
        min-width: 300px;
        max-width: 100%;
    }

    .register-header h2 {
        font-size: 1.5rem;
    }

    .input-field {
        padding: 10px 12px;
        font-size: 0.9rem;
    }

    .toggle-password img {
        width: 18px;
        height: 18px;
    }

    .register-btn,
    .login-btn {
        width: 45%;
        padding: 12px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .register-container {
        padding: 0.8rem;
        min-width: 280px;
    }

    .register-header h2 {
        font-size: 1.25rem;
    }

    .input-field {
        padding: 8px 10px;
        font-size: 0.8rem;
    }

    .toggle-password img {
        width: 16px;
        height: 16px;
    }

    .register-btn,
    .login-btn {
        width: 48%;
        padding: 10px;
        font-size: 0.8rem;
    }
}

@media (max-width: 320px) {
    .register-container {
        padding: 0.6rem;
        min-width: 260px;
    }

    .register-header h2 {
        font-size: 1.1rem;
    }

    .input-field {
        padding: 6px 8px;
        font-size: 0.75rem;
    }

    .toggle-password img {
        width: 14px;
        height: 14px;
    }

    .register-btn,
    .login-btn {
        width: 50%;
        padding: 8px;
        font-size: 0.75rem;
    }
}
</style>