import type { App, DirectiveBinding, DirectiveHook } from 'vue';

export type ReplaceNodeMap = {
  map: Map<HTMLElement, Comment>;
  create(el: Parameters<typeof running>[0]): Comment;
  get(el: Parameters<typeof running>[0]): Comment | undefined;
  set(el: Parameters<typeof running>[0], cmt: Comment): void;
  delete(el: Parameters<typeof running>[0]): void;
};

export type CheckFunction = (
  ...p: Parameters<typeof running>
) => boolean;

// 存储元素以及替换元素的Map，并封装好常用方法
const replaceNodeMap: ReplaceNodeMap = {
  map: new Map(),
  // 创建并存储注释节点
  create(el) {
    const cmt = document.createComment(' auth ');
    this.set(el, cmt);
    return cmt;
  },
  get(el) {
    return this.map.get(el);
  },
  set(el, cmt) {
    cmt && this.map.set(el, cmt);
  },
  delete(el) {
    this.map.delete(el);
  },
};

// 权限检查方法
let checkAuth: CheckFunction = () => true;

// running
const running: DirectiveHook<HTMLElement> = function (
  el,
  binding: DirectiveBinding<string>,
  ...p
) {
  // 检测方法
  if (checkAuth(el, binding, ...p)) {
    // 恢复元素
    const replaceNode = replaceNodeMap.get(el);
    if (replaceNode) {
      replaceNode.parentNode?.replaceChild(el, replaceNode);
      replaceNodeMap.delete(el);
    }
    return;
  }

  // 创建并存储一个注释节点，然后将注释节点与元素节点替换
  const cmt = replaceNodeMap.create(el);
  el.parentNode?.replaceChild(cmt, el);
};

/**
 * v-auth
 * 自定义权限指令
 * @param {function} cb: 鉴权方法,传参为自定义指令钩子函数参数
 */
const auth = (cb?: typeof checkAuth) => {
  if (cb) checkAuth = cb;

  return {
    install(app: App) {
      app.directive('auth', {
        mounted(el, binding, vnode) {
          running(el, binding, vnode, null);
        },

        beforeUpdate(el, binding, vnode, prevNode) {
          running(el, binding, vnode, prevNode);
        },

        beforeUnmount(el) {
          replaceNodeMap.delete(el);
        },
      });
    },
  };
};

export default auth;
