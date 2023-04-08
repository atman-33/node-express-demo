import {ValueObject} from "./ValuObject"

class WorkerGroupCode extends ValueObject<{ value: string }> {
    private constructor(props: { value: string }) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(code: string): WorkerGroupCode {

        // ここで正規表現や文字列の長さなどのバリデーションを行うことができます
        if (!code || code.trim().length === 0) {
            throw new Error("Worker group code must be provided");
        }

        return new WorkerGroupCode({ value: code });
    }
}

export { WorkerGroupCode }
