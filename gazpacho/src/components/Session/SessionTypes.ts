function generateHash(value: string) {
  return value.trim();
}
export class EmptyGoalException {
  readonly name: string = "EmptyGoalException";
  readonly message: string = "Goal can not be empty";
}
export class Goal {
  readonly key: string;
  readonly value: string;
  constructor(goal: string) {
    const trimGoal = goal.trim();
    if (trimGoal.length === 0) {
      throw new EmptyGoalException();
    }
    this.key = generateHash(trimGoal);
    this.value = trimGoal;
  }
  equals(item: Goal): boolean {
    return item.key === this.key;
  }
}
export class Session {
  private _day: Date;
  get day(): Date {
    return this._day;
  }

  private _clientName: string = "";
  get clientName(): string {
    return this._clientName;
  }
  set clientName(value: string) {
    this._clientName = value;
  }

  private _goals: Goal[] = [];
  get goals(): Goal[] {
    return this._goals.map((g) => g);
  }
  AddGoal(goal: string) {
    const newGoal = new Goal(goal);
    if (!this.goals.find((g) => g.equals(newGoal))) {
      this._goals.push();
    }
  }

  constructor() {
    this._day = new Date();
  }
}

export interface ISession {
  day: Date;
  clientName: string;
  goals: string[];
}
