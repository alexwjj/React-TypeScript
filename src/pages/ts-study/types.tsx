export interface UserModel {
  name: string;
  age?: number;
  sex: number;
  address?: string;
  tel?: string;
  favorite?: string;
}

// type TodoProperty = 'title' | 'description';

// type Todo = Record<TodoProperty, string>;

interface Todo {
  title: string;
  description: string;
  done: boolean;
}

type TodoBase = Omit<Todo, "title">;

// type T0 = Exclude<'a' | 'b' | 'c', 'a'>;

type T0 = Parameters<() => string>;  // []

type T1 = Parameters<(s: string) => void>;  // [string]