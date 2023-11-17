import type { App, DirectiveHook } from 'vue';
export type ReplaceNodeMap = {
    map: Map<HTMLElement, Comment>;
    create(el: Parameters<typeof running>[0]): Comment;
    get(el: Parameters<typeof running>[0]): Comment | undefined;
    set(el: Parameters<typeof running>[0], cmt: Comment): void;
    delete(el: Parameters<typeof running>[0]): void;
};
export type CheckFunction = (...p: Parameters<typeof running>) => boolean;
declare let checkAuth: CheckFunction;
declare const running: DirectiveHook<HTMLElement>;
/**
 * v-auth
 * 自定义权限指令
 * @param {function} cb: 鉴权方法,传参为自定义指令钩子函数参数
 */
declare const auth: (cb?: typeof checkAuth) => {
    install(app: App): void;
};
export default auth;
