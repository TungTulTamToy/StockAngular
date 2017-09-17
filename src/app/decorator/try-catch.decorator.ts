export function TryCatchDecorator(
    target: Object, // The prototype of the class
    propertyKey: string, // The name of the method
    descriptor: TypedPropertyDescriptor<any>
    ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      try{
        //console.log("TryCatchDecorator called on: ", target, propertyKey, descriptor);
        const result = originalMethod.apply(this, args);
        return result;
      }catch(error){
        console.log(error);
      }
    };

    return descriptor;
}