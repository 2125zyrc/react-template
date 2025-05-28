/** 审批状态 */
export enum PROCESS_STATUS {
  审核中 = 1,
  审批通过 = 2,
  审批拒绝 = 3,
}

/** 审批状态颜色 */
export enum PROCESS_STATUS_COLOR {
  审核中 = 'rgba(250, 140, 22, 1)',
  审批通过 = 'rgba(82, 196, 26, 1)',
  审批拒绝 = 'rgba(245, 34, 45, 1)',
}
