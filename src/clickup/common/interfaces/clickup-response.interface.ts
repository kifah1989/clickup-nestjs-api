export interface ClickUpApiResponse<T = any> {
  data?: T;
  success?: boolean;
  error?: string;
  message?: string;
}

export interface ClickUpTask {
  id: string;
  name: string;
  description?: string;
  status: {
    id: string;
    status: string;
    color: string;
    type: string;
  };
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed?: string;
  date_done?: string;
  archived: boolean;
  creator: {
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture?: string;
  };
  assignees: Array<{
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture?: string;
  }>;
  watchers: Array<{
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture?: string;
  }>;
  checklists: any[];
  tags: Array<{
    name: string;
    tag_fg: string;
    tag_bg: string;
    creator: number;
  }>;
  parent?: string;
  priority?: {
    id: string;
    priority: string;
    color: string;
    orderindex: string;
  };
  due_date?: string;
  start_date?: string;
  points?: number;
  time_estimate?: number;
  time_spent?: number;
  custom_fields: any[];
  dependencies: any[];
  linked_tasks: any[];
  team_id: string;
  url: string;
  permission_level: string;
  list: {
    id: string;
    name: string;
    access: boolean;
  };
  project: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  folder: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  space: {
    id: string;
  };
}

export interface ClickUpSpace {
  id: string;
  name: string;
  color?: string;
  private: boolean;
  avatar?: string;
  admin_can_manage?: boolean;
  statuses: Array<{
    id: string;
    status: string;
    type: string;
    orderindex: number;
    color: string;
  }>;
  multiple_assignees: boolean;
  features: {
    due_dates: {
      enabled: boolean;
      start_date: boolean;
      remap_due_dates: boolean;
      remap_closed_due_date: boolean;
    };
    time_tracking: {
      enabled: boolean;
    };
    tags: {
      enabled: boolean;
    };
    time_estimates: {
      enabled: boolean;
    };
    checklists: {
      enabled: boolean;
    };
    custom_fields: {
      enabled: boolean;
    };
    remap_dependencies: {
      enabled: boolean;
    };
    dependency_warning: {
      enabled: boolean;
    };
    portfolios: {
      enabled: boolean;
    };
  };
  archived: boolean;
}

export interface ClickUpList {
  id: string;
  name: string;
  orderindex: number;
  status?: string;
  priority?: {
    priority: string;
    color: string;
  };
  assignee?: {
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture?: string;
  };
  task_count?: number;
  due_date?: string;
  due_date_time?: boolean;
  start_date?: string;
  start_date_time?: boolean;
  folder: {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
  };
  space: {
    id: string;
    name: string;
    access: boolean;
  };
  archived: boolean;
  override_statuses?: boolean;
  statuses?: Array<{
    id: string;
    status: string;
    orderindex: number;
    color: string;
    type: string;
  }>;
  permission_level: string;
}

export interface ClickUpUser {
  id: number;
  username: string;
  color: string;
  profilePicture?: string;
  initials: string;
  email: string;
  role: number;
  custom_role?: any;
  last_active: string;
  date_joined: string;
  date_invited: string;
}

export interface ClickUpWorkspace {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  members: ClickUpUser[];
}