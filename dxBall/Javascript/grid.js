
function grid(){
	this.grid = new Array(15).fill(new Array(w/scl/2).fill(1));
	this.grid.forEach((x,i,arr) => arr[i] = x.map((y,j)=>y+j+i));

	this.show = function(){
		this.grid.forEach((x,i)=>x.forEach((y,j)=>{
			if (y != 0){
				color_pick(y%6+1);
				rect(j*scl*2,i*scl+ceiling,scl*2,scl);
			}
		}));
	}
}