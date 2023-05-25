let n = prompt("Enter a value for n:");
let firstSeries=[];

 for ( i= 1; i<=n ; i++){
    firstSeries[i-1]=i*1;
 }
    console.log(firstSeries);

    let secondSeries=[];

 for ( a= 1; a<=n ; a++){
    secondSeries[a-1]=a*a;
 }
    console.log(secondSeries);

    let thirdSeries=[];

    for ( b= 1; b<=n ; b++){
       thirdSeries[b]=(b-2)*2;
    }
       console.log(thirdSeries);
   