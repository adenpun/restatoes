export class Store<T> {
    private m_data: T;

    public constructor(initialData: T) {
        this.m_data = initialData ?? ({} as T);
    }

    public set(value: T) {
        this.m_data = value;
        console.log(this.data);
    }

    public get data(): T {
        return this.m_data;
    }
}

type StoreType = Store<any>;

type KeyOf<T extends StoreType> = keyof T["data"];

export function useState<Store extends StoreType>(
    store: Store,
    key: KeyOf<Store>
): [typeof store["data"][KeyOf<Store>], (value: typeof store["data"][KeyOf<Store>]) => void] {
    const setter = (value: typeof key) => {
        console.log(store.data[key], value);
        store.set("a");
        // store.data[key] = value;
        return;
    };

    return [store.data[key], setter];
}

interface Interface {
    b: string;
}

const store = new Store<Interface>({ b: "data" });

const [val, set] = useState(store, "b");

console.log(val);

set("a");

console.log(val);
