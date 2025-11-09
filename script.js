// 江西粤东气象社区交流安全中心系统 - 通用脚本

// 数据存储与管理
const DataManager = {
  // 初始化本地存储数据
  initData() {
    // 检查是否已有数据，没有则初始化
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        {
          id: '1',
          username: '我就是天才',
          qqNumber: '189203615',
          password: '189203615aazz', // 实际应用中应加密存储
          avatar: 'https://via.placeholder.com/150',
          role: 'admin',
          status: 'normal',
          banInfo: null
        },
        {
          id: '2',
          username: '气象爱好者小王',
          qqNumber: '123456789',
          password: 'password123',
          avatar: 'https://via.placeholder.com/150',
          role: 'user',
          status: 'normal',
          banInfo: null
        },
        {
          id: '3',
          username: '天气预报员',
          qqNumber: '987654321',
          password: 'password456',
          avatar: 'https://via.placeholder.com/150',
          role: 'user',
          status: 'normal',
          banInfo: null
        }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem('reports')) {
      const initialReports = [
        {
          id: '1',
          reporterId: '2',
          reportedUsername: '违规用户A',
          reportedQqNumber: '111111111',
          group: '江西气象爱好者',
          violationType: '虚假/谣言信息',
          description: '该用户发布虚假天气预报信息，误导他人',
          evidence: ['https://via.placeholder.com/300x200'],
          status: 'completed',
          result: '已处理，对被举报人进行警告处理',
          processingTime: '2023-07-15T10:30:00',
          processorId: '1',
          createTime: '2023-07-14T15:20:00'
        },
        {
          id: '2',
          reporterId: '3',
          reportedUsername: '违规用户B',
          reportedQqNumber: '222222222',
          group: '粤东气象爱好者',
          violationType: '辱骂/侮辱他人',
          description: '在群聊中辱骂其他用户，言语恶劣',
          evidence: ['https://via.placeholder.com/300x200'],
          status: 'processing',
          result: '',
          processingTime: '',
          processorId: '',
          createTime: '2023-07-16T09:15:00'
        }
      ];
      localStorage.setItem('reports', JSON.stringify(initialReports));
    }

    if (!localStorage.getItem('punishments')) {
      const initialPunishments = [
        {
          id: '1',
          userId: '2',
          reason: '发布虚假天气预报信息',
          type: 'warning',
          duration: '3天',
          startTime: '2023-07-15T10:30:00',
          endTime: '2023-07-18T10:30:00',
          status: 'active',
          appealId: '',
          createTime: '2023-07-15T10:30:00'
        }
      ];
      localStorage.setItem('punishments', JSON.stringify(initialPunishments));
    }

    if (!localStorage.getItem('appeals')) {
      const initialAppeals = [
        {
          id: '1',
          userId: '2',
          punishmentId: '1',
          description: '我发布的天气预报是有来源的，并非虚假信息',
          evidence: ['https://via.placeholder.com/300x200'],
          status: 'submitted',
          result: '',
          processingTime: '',
          processorId: '',
          createTime: '2023-07-16T14:20:00'
        }
      ];
      localStorage.setItem('appeals', JSON.stringify(initialAppeals));
    }

    if (!localStorage.getItem('rules')) {
      const initialRules = [
        {
          id: '1',
          title: '江西粤东气象社区交流规范',
          content: '1. 遵守国家法律法规和社会主义核心价值观\n2. 尊重他人，友善交流，禁止辱骂、侮辱他人\n3. 发布真实、准确的气象信息，禁止传播虚假信息\n4. 禁止发布色情、暴力、政治敏感等不良内容\n5. 禁止发布与气象无关的广告信息\n6. 保护个人隐私，禁止泄露他人个人信息\n7. 积极参与社区建设，共同维护良好的交流环境'
        },
        {
          id: '2',
          title: 'QQ群聊交流规范',
          content: '1. 遵守群公告和管理员要求\n2. 保持群聊内容与气象相关\n3. 禁止刷屏、恶意灌水\n4. 禁止发布群成员不感兴趣的广告信息\n5. 尊重他人观点，理性讨论，禁止人身攻击\n6. 遇到问题及时向管理员反馈，共同维护群聊秩序'
        }
      ];
      localStorage.setItem('rules', JSON.stringify(initialRules));
    }
  },

  // 获取所有用户
  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  // 获取用户信息
  getUserById(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  },

  // 获取用户信息通过QQ号码
  getUserByQqNumber(qqNumber) {
    const users = this.getUsers();
    return users.find(user => user.qqNumber === qqNumber);
  },

  // 添加用户
  addUser(user) {
    const users = this.getUsers();
    user.id = Date.now().toString();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
  },

  // 更新用户信息
  updateUser(user) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  },

  // 获取所有举报
  getReports() {
    return JSON.parse(localStorage.getItem('reports') || '[]');
  },

  // 获取用户的举报
  getReportsByUserId(userId) {
    const reports = this.getReports();
    return reports.filter(report => report.reporterId === userId);
  },

  // 添加举报
  addReport(report) {
    const reports = this.getReports();
    report.id = Date.now().toString();
    report.status = 'processing';
    report.createTime = new Date().toISOString();
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
    return report;
  },

  // 更新举报状态
  updateReport(report) {
    const reports = this.getReports();
    const index = reports.findIndex(r => r.id === report.id);
    if (index !== -1) {
      reports[index] = report;
      localStorage.setItem('reports', JSON.stringify(reports));
      return true;
    }
    return false;
  },

  // 获取所有处罚
  getPunishments() {
    return JSON.parse(localStorage.getItem('punishments') || '[]');
  },

  // 获取用户的处罚
  getPunishmentsByUserId(userId) {
    const punishments = this.getPunishments();
    return punishments.filter(punishment => punishment.userId === userId);
  },

  // 添加处罚
  addPunishment(punishment) {
    const punishments = this.getPunishments();
    punishment.id = Date.now().toString();
    punishment.status = 'active';
    punishment.createTime = new Date().toISOString();
    punishments.push(punishment);
    localStorage.setItem('punishments', JSON.stringify(punishments));
    
    // 更新用户状态
    if (punishment.type === 'ban') {
      const user = this.getUserById(punishment.userId);
      if (user) {
        user.status = 'banned';
        user.banInfo = {
          reason: punishment.reason,
          startTime: punishment.startTime,
          endTime: punishment.endTime
        };
        this.updateUser(user);
      }
    }
    
    return punishment;
  },

  // 更新处罚状态
  updatePunishment(punishment) {
    const punishments = this.getPunishments();
    const index = punishments.findIndex(p => p.id === punishment.id);
    if (index !== -1) {
      punishments[index] = punishment;
      localStorage.setItem('punishments', JSON.stringify(punishments));
      
      // 如果处罚被撤销，更新用户状态
      if (punishment.status === 'revoked') {
        const user = this.getUserById(punishment.userId);
        if (user) {
          user.status = 'normal';
          user.banInfo = null;
          this.updateUser(user);
        }
      }
      
      return true;
    }
    return false;
  },

  // 获取所有申诉
  getAppeals() {
    return JSON.parse(localStorage.getItem('appeals') || '[]');
  },

  // 获取用户的申诉
  getAppealsByUserId(userId) {
    const appeals = this.getAppeals();
    return appeals.filter(appeal => appeal.userId === userId);
  },

  // 添加申诉
  addAppeal(appeal) {
    const appeals = this.getAppeals();
    appeal.id = Date.now().toString();
    appeal.status = 'submitted';
    appeal.createTime = new Date().toISOString();
    appeals.push(appeal);
    localStorage.setItem('appeals', JSON.stringify(appeals));
    
    // 更新处罚状态为已申诉
    const punishment = this.getPunishmentById(appeal.punishmentId);
    if (punishment) {
      punishment.status = 'appealed';
      punishment.appealId = appeal.id;
      this.updatePunishment(punishment);
    }
    
    return appeal;
  },

  // 更新申诉状态
  updateAppeal(appeal) {
    const appeals = this.getAppeals();
    const index = appeals.findIndex(a => a.id === appeal.id);
    if (index !== -1) {
      appeals[index] = appeal;
      localStorage.setItem('appeals', JSON.stringify(appeals));
      
      // 如果申诉通过，更新处罚状态
      if (appeal.status === 'approved') {
        const punishment = this.getPunishmentById(appeal.punishmentId);
        if (punishment) {
          punishment.status = 'revoked';
          this.updatePunishment(punishment);
        }
      }
      
      return true;
    }
    return false;
  },

  // 获取处罚通过ID
  getPunishmentById(id) {
    const punishments = this.getPunishments();
    return punishments.find(punishment => punishment.id === id);
  },

  // 获取所有规则
  getRules() {
    return JSON.parse(localStorage.getItem('rules') || '[]');
  }
};

// 用户认证管理
const AuthManager = {
  // 初始化
  init() {
    DataManager.initData();
  },

  // 用户登录
  login(qqNumber, password) {
    const user = DataManager.getUserByQqNumber(qqNumber);
    if (user && user.password === password) {
      // 检查用户是否被封禁
      if (user.status === 'banned') {
        return { success: false, message: '账号已被封禁，请联系管理员' };
      }
      
      // 保存登录状态
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'QQ号码或密码错误' };
  },

  // 用户注册
  register(username, qqNumber, password) {
    // 检查QQ号码是否已存在
    const existingUser = DataManager.getUserByQqNumber(qqNumber);
    if (existingUser) {
      return { success: false, message: '该QQ号码已注册' };
    }
    
    // 创建新用户
    const newUser = {
      username,
      qqNumber,
      password,
      avatar: 'https://via.placeholder.com/150',
      role: 'user',
      status: 'normal',
      banInfo: null
    };
    
    const user = DataManager.addUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  },

  // 退出登录
  logout() {
    localStorage.removeItem('currentUser');
  },

  // 获取当前登录用户
  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },

  // 检查是否已登录
  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // 检查是否为管理员
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  // 检查用户是否被封禁
  isBanned() {
    const user = this.getCurrentUser();
    return user && user.status === 'banned';
  }
};

// 工具函数
const Utils = {
  // 格式化日期
  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  },

  // 生成随机ID
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },

  // 显示提示消息
  showMessage(message, type = 'info') {
    // 创建提示元素
    const messageEl = document.createElement('div');
    messageEl.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      type === 'warning' ? 'bg-yellow-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    messageEl.textContent = message;
    
    // 添加到页面
    document.body.appendChild(messageEl);
    
    // 淡出效果
    setTimeout(() => {
      messageEl.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 300);
    }, 3000);
  },

  // AI生成违规处理解释
  generateViolationExplanation(violationType, description) {
    // 模拟AI生成解释
    const explanations = {
      '色情低容/资源': '根据社区规范第4条，禁止发布色情、暴力等不良内容。您发布的内容包含不适当的信息，违反了社区规定。',
      '政治敏感': '根据社区规范第1条，遵守国家法律法规和社会主义核心价值观。您发布的内容涉及政治敏感话题，违反了社区规定。',
      '辱骂/侮辱他人': '根据社区规范第2条，尊重他人，友善交流，禁止辱骂、侮辱他人。您的言论构成了对他人的不尊重，违反了社区规定。',
      '虚假/谣言信息': '根据社区规范第3条，发布真实、准确的气象信息，禁止传播虚假信息。您发布的信息经核实为虚假内容，违反了社区规定。',
      '无关的广告信息': '根据社区规范第5条，禁止发布与气象无关的广告信息。您发布的内容属于无关广告，违反了社区规定。',
      '私信骚扰': '根据社区规范第2条和第6条，尊重他人并保护个人隐私。您的行为构成了对他人的骚扰，违反了社区规定。',
      '其他': '您的行为违反了社区规范，具体原因：' + description
    };
    
    return explanations[violationType] || explanations['其他'];
  },

  // 检查用户权限
  checkPermission() {
    const user = AuthManager.getCurrentUser();
    
    // 如果未登录，跳转到登录页
    if (!user) {
      window.location.href = 'login.html';
      return false;
    }
    
    // 如果是管理员页面，但用户不是管理员
    if (window.location.pathname.includes('admin.html') && user.role !== 'admin') {
      Utils.showMessage('您没有权限访问该页面', 'error');
      window.location.href = 'index.html';
      return false;
    }
    
    // 如果用户被封禁，显示提示
    if (user.status === 'banned') {
      // 除了申诉页面和登录页面，其他页面都显示封禁提示
      if (!window.location.pathname.includes('appeal.html') && !window.location.pathname.includes('login.html')) {
        const banMessage = document.createElement('div');
        banMessage.className = 'fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center z-50';
        banMessage.innerHTML = `
          <p class="font-bold">账号已被封禁</p>
          <p>原因：${user.banInfo.reason}</p>
          <p>时间：${Utils.formatDate(user.banInfo.startTime)} ${user.banInfo.endTime ? `至 ${Utils.formatDate(user.banInfo.endTime)}` : '永久'}</p>
          <p>您可以 <a href="appeal.html" class="underline">提交申诉</a> 或联系管理员</p>
        `;
        document.body.prepend(banMessage);
        
        // 禁用除导航和申诉外的所有交互元素
        setTimeout(() => {
          const interactiveElements = document.querySelectorAll('button:not(.nav-btn), input, textarea, select, a:not(.nav-link):not([href="appeal.html"])');
          interactiveElements.forEach(el => {
            el.disabled = true;
            el.style.opacity = '0.5';
            el.addEventListener('click', (e) => {
              e.preventDefault();
              Utils.showMessage('账号已被封禁，该功能已被限制', 'warning');
            });
          });
        }, 100);
      }
    }
    
    return true;
  },

  // 初始化底部导航
  initBottomNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath.includes(linkPath)) {
        link.classList.add('text-blue-600');
        link.classList.remove('text-gray-600');
      }
    });
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  AuthManager.init();
  
  // 检查权限（登录页面和注册页面除外）
  if (!window.location.pathname.includes('login.html')) {
    Utils.checkPermission();
  }
  
  // 初始化底部导航（登录页面和管理员页面除外）
  if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('admin.html')) {
    Utils.initBottomNav();
  }
});