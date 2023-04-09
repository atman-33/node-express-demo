import {ValueObject} from "./ValuObject"

class WorkerGroupName extends ValueObject<{ value: string }> {
    private constructor(props: { value: string }) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(code: string): WorkerGroupName {

        // ここで正規表現や文字列の長さなどのバリデーションを行うことができます

        return new WorkerGroupName({ value: code });
    }
}

export { WorkerGroupName }
