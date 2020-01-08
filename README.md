# Fetch Mock Machine

## Charlie Notes
Here were some cool suggestions from charlie about typeOf types that pull accepted values from object key names:

```js
const mockAdapters = {
    name1: 'bill',
    age: 12,
    bio: 'hi'
}

type ValidValues = keyof typeof mockAdapters; // 'name1' | 'age' | 'bio'

const mock = (val: ValidValues) => {}

import { FM, contentAppApi } from 'fet'

mock(contentAppApi.getEditUrl, {})

// Mapped interface, Mapped is just a regular word, it's convention
interface A {
    a: string;
    b: ;
}

type Mapped<T> = {[P in keyof A]: () => A[P]}

const transform = <T>(input): Mapped<T> => {
    
}

type B = Mapped<A>;
```
