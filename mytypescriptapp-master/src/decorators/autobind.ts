
//autobind decorator
    export function autobind(
        _target: any,
        _methodName: string, //使わない
        descriptor: PropertyDescriptor
    ) {

        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }

        }
        return adjDescriptor;
    }

