var express = require('express');
var app = express();
var fs=require('fs');
const path = require('path');
var bodyParser = require('body-parser')
 
const session=require('express-session')
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.resolve(__dirname, '')));
var fs = require('fs');
var dir = '/tmp';
 
//const handler = (req, res) => res.send(path.join(__dirname, "./public/index.ejs"))
app.set('view engine','ejs')
//const routes = ["/", "/authuser"]
var sis;
app.set('views', path.join(__dirname, 'views'));
let chrome = {};
let puppeteer;

 
  puppeteer = require('puppeteer');
 


//routes.forEach( route => app.get(route, handler) )
app.use( bodyParser.json() );       
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.use(session({ secret: "mano1234", saveUninitialized: true, resave: true }));

app.use(cookieParser());
 
app.get('/', function(request, response) {
 console.log("here");
 sis=request.session;
	response.render('index',{n:"frefef"})
});
 
async function test(){
const browser=await puppeteer.launch({});

const page =await browser.newPage();
await page.setDefaultNavigationTimeout(0)

await page.goto("https://www.codechef.com/START49C?order=desc&sortBy=successful_submissions")
//awa 
for(var i=1;i<5;i++)
{
	var element=await page.waitForXPath("/html/body/div[2]/div/main/section/div[2]/div/div/div[2]/div[2]/table/tbody/tr["+i+"]/td[2]/div")

var text=await page.evaluate(element=>element.textContent,element)
 

console.log(text)
}
browser.close()
} 
//test()
app.get('/years',async(req,res) =>{
await con. query("select   year,count(year)as dpcount from years group by year",(err,rres)=>{
	var curyear="null";
	console.log(rres)
	res.render('years',{rres,curyear})
})
 

})
const mysql = require('mysql')
const con  = mysql.createConnection({
    connectionLimit : 100,
    host            :'localhost' ,//'cpdb1.cjlyu7lpn9hv.ap-south-1.rds.amazonaws.com',
	port:3306,
    user            : 'root',
    password        :'',// 'sDFPjqEsvWnhSqGg3Ch5',
    database        : 'cpdb'
})   
con.connect(function(err) { 
	if (err) throw err;
	console.log("Connected!"); 
  }); 
  
  
app.post('/addyearcall',urlencodedParser,async(a,b)=>{

console.log(a.body["year"]);
var year=a.body["year"];
con.query("insert into years(year) values(?)",[year], async(err,res)=>{

console.log(res);
if(err) {
	
	await con.query("select * from years",async(err,rres)=>{

		console.log("cp"+rres)
	 
		b.render('years',{rres,fallback:0})
		//b.end()
	}) 
}
else{
	await con.query("select * from years",async(err,rres)=>{

		console.log("cp"+rres)
	 
		b.render('years',{rres,fallback:1})
		//b.end()
	}) 

	//b.render('/years',{fallback:1})
}

})
 

}) 
 app.post("/authuserep",urlencodedParser,async(req,res)=>{
var email=req.body.email;
var password=req.body.password;
if(email!=null&&password!=null){
	con.query("select * from login where email=? and password=?",[email,password],async(err,data)=>{
     if(data.length==1){
		var role=data[0].role;
			  email=data[0].email;
			  var dp=data[0].dp;
			 res.cookie("role",role);
			 res.cookie("emailid",email);
			 res.cookie("dp",dp);
			// bass.session.emailid=email
			// bass.session.dp=dp
			 
			 if(role=="admin")
			 res.redirect('admindashboard')
			 else
			 {
		con.query("select * from studentinfo where email=?",[email],(err,d)=>{
				console.log(d[0])
				res.cookie("chef",d[0].codechefusername);
				res.redirect('dashboard')
			})	
				
			
			}
	 }
	 else{
/*req.session.emailid=email;
		res.render('userregister',{emailid:req.session.emailid});*/
		res.send("<h1>Looks like you are not registered</h1><a href='../'><h2>Click here to go back to home.login using college email to register</h2></a>")

	 }



	})
}

 })
const {OAuth2Client} = require('google-auth-library');
const { render } = require('ejs');
const client = new OAuth2Client('61252141264-rc3lrhfo7cb5fb3menl7d0olaq8g6uvf.apps.googleusercontent.com');
app.post('/authuser',urlencodedParser,async(a,bass,next)=>{
	console.log(a.url);
	//console.log(a.body)
	var name,email,userid,domain,dp;
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: a.body.credential,
			audience: "61252141264-rc3lrhfo7cb5fb3menl7d0olaq8g6uvf.apps.googleusercontent.com",   
	 
		});
		const payload = ticket.getPayload();
		name= payload['name'];
		email= payload['email'];
		userid= payload['sub'];
		domain= payload['hd'];
		dp= payload['picture'];
		userid= payload['sub'];
		// console.log(payload)
	  }
	  verify().catch(console.error).then((re,ra)=>{
		//console.log("test"+name)
		//console.log("test"+email)
		 if(domain!="cmrtc.ac.in")
		{
			bass.render('index',{domain:false})
		}
		else
		{ 
			 
		con.query("select * from login where email=?",[email],(err,data)=>{
			console.log(err)
var found=data.length
console.log(data)
if(found==1)
			{var role=data[0].role;
			  email=data[0].email;
			 bass.cookie("role",role);
			 bass.cookie("emailid",email);
			 bass.cookie("dp",dp);
			// bass.session.emailid=email
			// bass.session.dp=dp
			 
			 if(role=="admin")
			 bass.redirect('admindashboard')
			 else
			{
				con.query("select * from studentinfo where email=?",[email],(err,d)=>{
					bass.cookie("chef",d[0].codechefusername);
					bass.redirect('dashboard')
				})
				
		} 

			}
			 if(found==0){
 
sis=a.session;
sis.emailid=email
console.log(a.session.emailid)

bass.render('userregister',{emailid:a.session.emailid});
next();
			 }

		
		})
		 
	}

	  });
	 //bass.end()
 
});
app.post('/addstudent',urlencodedParser,async(req,res)=>{
//console.log(req);
var name=req.body.name.trim();
var chef=req.body.ccuser.trim();
var yop=req.body.pyear.trim();
var pass=req.body.password.trim();
res.redirect("./");
var terms=req.body.terms;
console.log(req.session.emailid)
var roll=(req.session.emailid).split('@')[0];
await con.query("insert into login(email,role,password) values(?,?,?)",[req.session.emailid,"Student",pass],async (err,res)=>{
await con.query("insert into studentinfo values(?,?,?,?,?,?,?,?) ",[roll,name,req.session.emailid,chef,req.body.branch,req.body.section,yop,"NS"]
,async(err,res)=>{

console.log("User added")


}
 
)


})





})
app.get('/dashboard',(req,res)=>{
	var email=req.cookies.emailid.trim();
	con.query("SELECT count(*) as cnt from assignments where email=?;",[email],(err,r1)=>{
		con.query("select count(*) as cnt from assignments where email=? and score>0",[email],(err,r2)=>{
 con.query("select sum(score) as ps from assignments where email=?",[email],(err,r3)=>{
	res.render('dashboard',{total_assignments:r1[0].cnt,att:r2[0].cnt,ps:r3[0].ps})
 })
		})
	})
	
	
	 
})
app.get('/admindashboard',async(re,res)=>{
var total_assignments;
var stu_reg;
var admincnt;
	await con.query("select count(id) as cnt from assinfo",async(err,result)=>{
		total_assignments=result[0].cnt;
	await	con.query("select count(*) as cnt from studentinfo",async(err,result1)=>{
			stu_reg=result1[0].cnt;
	await 	 con.query("select count(*) as cnt from login where role=?",["admin"],async(err,result2)=>{
admincnt=result2[0].cnt;

await con.query("SELECT year,count(dept)-1 as d FROM cpdb.years group by year",async(err,result3)=>{
	var years=[];
	var deptcnt=[];
	for(var i=0;i<result3.length;i++){
		years[i]=result3[i].year;

		deptcnt[i]=result3[i].d;

	}
	
	console.log(years)
	 await con.query("SELECT passout,count(passout)as ct FROM cpdb.studentinfo group by passout;",async(err,result4)=>{
		var years1=[]
		var stucnt=[]
		for(var i=0;i<result4.length;i++){
			years1[i]=result4[i].passout;
	
			stucnt[i]=result4[i].ct;
	
		}
		await con.query("SELECT branch,count(branch)as ct FROM cpdb.studentinfo group by branch;",async(err,result5)=>{
			var years2=[]
			var stucnt1=[]
			for(var i=0;i<result5.length;i++){
				years2[i]=result5[i].branch;
		
				stucnt1[i]=result5[i].ct;   
		
			}
			await con.query("select sum(score) as s,passout from assignments inner join studentinfo on studentinfo.email=assignments.email group by studentinfo.passout;",async(err,result6)=>{
				var years3=[]
				var score=[]
				for(var i=0;i<result6.length;i++){
					years3[i]=result6[i].passout;
			
					score[i]=result6[i].s;   
			
				}
				res.render('admindashboard',{total_assignments,stu_reg,admincnt,x:({years}),y:deptcnt,x1:({years1}),y1:stucnt,x2:({years2}),y2:stucnt1,x3:({years3}),y3:score});
		
			})
		})
		
	 })

})

		 })
		
		})
		
	})


 
})
app.get('/viewstuassignments',async(req,res)=>{
var ids=[];
var start=[];
var end=[];
var j=0;
//	console.log(req.session );
await con.query("select assinfo.* from assignments inner join assinfo on assinfo.id=assignments.id where assignments.email=? order by start desc",[req.cookies.emailid],async(err,result)=>{
	console.log(result);
	ids=result;

 
    
 
	//console.log();
	await res.render('viewstuassignments',{a:ids});

	

})


})

app.get('/newassignment',(re,res)=>{
	var Assignmentid= Date.now()
	res.render('newassignment',{aid:Assignmentid});
	res.end()
})
app.get('/logout',(a,b)=>{
a.session.destroy()
b.render('index')
})
 
async function createassigment(data,dt,id,dte,codes){
	console.log("Entered create assignement fun")
	for(var i=0;i<data.length;i++){
		await con.query("insert into assignments values(?,?,?,?)",[id,data[i].email,dt,0],async (err,res)=>{
			//console.log(res)
			console.log("ERR"+err)
		})
	}
	 await con.query("insert into assinfo values(?,?,?,?)",[id,dt,dte,codes],async(err,res)=>{
        console.log(err);	
		//console.log(res) 
		//var cols=
		var carr=codes.split(",")
		var q=""
		for(var j=0;j<carr.length;j++)
       q+=","+carr[j]+" int"
		await con.query("create table a"+id+"(email varchar(300) primary key"+q+",total int)")
	 })


}
app.post('/addtest',urlencodedParser,async (a,b)=>{
var id=a.body.id.trim();
var codes=a.body.pscodes.trim()
 var start=a.body.startdt.trim()
 var end=a.body.enddt.trim()
 var passout=a.body.passout.trim()
 var department=a.body.department.trim()
var t,toadd;
if(passout!="ALL"){
	if(department!="ALL"){
		sql="select email from studentinfo where branch=? and passout=?";
	await	con.query(sql,[department,passout],(err,res,fi)=>{
              console.log("fields"+fi.keys)
			  
console.log(err);
//console.log(res);
createassigment(res,start,id,end,codes).then(()=>{
	console.log("Done")
	b.render('newassignment',{created:true,aid:Date.now()})

});
		
		})
	}
	else{
		sql="select email from studentinfo where passout=?";
	await	con.query(sql,[passout],(err,res,fi)=>{
              console.log("fields"+fi.keys)
console.log(err);
//console.log(res);
createassigment(res,start,id,end,codes).then(()=>{
	console.log("Done")
	b.render('newassignment',{created:true,aid:Date.now()})

});
		
		})
	}
}
else{
if(department!="ALL"){
	sql="select email from studentinfo where branch=? ";
	await	con.query(sql,[department],(err,res,fi)=>{
              console.log("fields"+fi.keys)
console.log(err);
//console.log(res);
createassigment(res,start,id,end,codes).then(()=>{
	console.log("Done")
	b.render('newassignment',{created:true,aid:Date.now()})

});
		
		})
}
else{
	sql="select email from studentinfo";
	await	con.query(sql,(err,res,fi)=>{
              console.log("fields"+fi.keys)
console.log(err);
//console.log(res);
createassigment(res,start,id,end,codes).then(()=>{
	console.log("Done")
b.render('newassignment',{created:true,aid:Date.now()})

}); 
		
		})
}

}


	



 

})
 

var s=app.listen(process.env.PORT||4000);
s.keepAliveTimeout=30000
s.headersTimeout=40000



app.post("/viewassignment",urlencodedParser,(req,res)=>{

var id=req.body.id;
id=id.trim();
con.query("select * from assinfo where id=?",[id],async(err,data)=>{
	var expired=false;
	con.query("select * from assinfo where id=? and start<now() and now()<end",[id],(err,ds)=>{
     if(ds.length==0)
	 expired=true;
	})
var start=data[0].start;
var end=data[0].end;
var codes=data[0].codes.split(",");
console.log("Assignment codes "+codes);
 con.query("select * from a"+id+" where email=?",[req.cookies.emailid],(err,scores1)=>{
 console.log(scores1)
 curscores=[]
 
 if(scores1.length==0){
	con.query("insert into a"+id+"(email,total) values('"+req.cookies.emailid+"','0') ",(err,done)=>{

console.log(err)
con.query("select * from a"+id+" where email=?",[req.cookies.emailid],(err,scores)=>{
	for(var k=0;k<scores.length-2;k++)
	curscores=scores[0].codes[k]
	console.log("curscores "+curscores)
	res.render("viewassignment",{e:expired,email:req.cookies.emailid,id:id,a:codes,b:curscores,total:scores[0]['total']}) })

	})
 }
 else{
	//console.log(scores)
	for(var k=0;k<codes.length;k++)


	{
		
		var cc=""+codes[k]+"";
		curscores[k]=scores1[0][cc];
		console.log(curscores)
	 }
	res.render("viewassignment",{e:expired,email:req.cookies.emailid,id:id,a:codes,b:curscores,total:scores1[0]['total']}); 
 }

  
 })


 


})
console.log(id); 


    
})
function sleep(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }
var work=0,waiting=0;
  app.post("/updatescore",urlencodedParser,async(req,res)=>{
	res.render('viewstuassignments',{mes:true})
	console.log("work "+work+"\nwaiting "+waiting)
waiting++;

	while(waiting>0){
 
if(work==0){
	waiting--;
	work++;
	var email=req.body.email.trim()
	var id=req.body.id.trim();
	var chef=req.cookies.chef.trim()
	var total=req.body.total.trim()
	
console.log("Start score update"+id)
await con.query("select * from assinfo where id=?",[id],async(err,data)=>{
	//console.log(id)
	var codes=data[0]['codes'].split(",");
	await  updatesstatus(codes,email,chef).then(async(response)=>{
		 var solved=response.solved.trim().split(",");
		 var e=response.e.trim();
		 console.log("Received database update request to add "+solved +" to "+e);
		 var y=solved.length
		 if(solved[solved.length-1]=="")
y--;
		 for(var j=0;j<y;j++){
			var cccode=solved[j].trim();
			
			await updatedb(cccode,y,e,id).then((res)=>{
				console.log("Score db updated successfully,OOHOO! "+cccode+" "+e+" "+reply);
				
				

			})

		
		
			
		 }
		 work--;	

	  })



	})



}
else
{

await	sleep(50000).then((res)=>{
		 
	})

	console.log("Work else block "+work)
	}
	}
})
async function updatedb(cccode,total,email,id){
	return new Promise(async (resolve)=>{
		console.log("current update code="+cccode);
		if(cccode.length==0)
		resolve({reply:true})
		else{
		await con.query("update a"+id+" set "+cccode+" =1,total="+total+" where email=?",[email],async(err,resp)=>{
			console.log("ERR "+cccode+" for user "+email+" "+err); 
			await con.query("update assignments set score ="+total+" where email=? and id=?",[email,id],async(err,resp)=>{
			resolve({reply:true})
			})
			
			  })}
	})
}
async function updatesstatus( codes,email ,chef){
	return new Promise(async(resolve)=>{

		console.log("Codes realtime update list "+codes);
		
		reply="";
		for(var i=0;i<codes.length;i++){
			console.log("Web run for "+codes[i]+ " "+chef );
	result=	await	webrun(codes[i],chef).then(async(res)=>{
				
				 console.log(i+" "+res);
				if(i==codes.length-1)
				{console.log("reply ="+res.reply+"i val"+i)
					if(res.reply!="false")
					reply+=res.reply
					
					resolve({solved:reply,e:email});
				}
				else if(res.reply!="false")
				reply+=res.reply+","
				return reply
				 
			})
			console.log(result)
			
			 
		}
	
	
		
	})

} 

async function webrun(codes,chef){
	return new Promise(async(resolve)=>{

		const browser=await puppeteer.launch({});
		const page =await browser.newPage();
		var url="https://www.codechef.com/status/"+codes+"?sort_by=All&sorting_order=asc&language=All&contest=All&status=FullAC&handle=+"+chef+"%2C+&Submit=GO";
		
			console.log(url);
 
		await page.goto(url)
		try{ 
			var element=await page.waitForXPath("/html/body/center/center/table/tbody/tr/td/div/div/div/div/div[2]/div/div/div/div/div[3]/table/tbody/tr/td[4]/span")
		//var e2=await page.waitForXPath("/html/body/center/center/table/tbody/tr/td/div/div/div/div/div[2]/div/div/div/div/div[3]/table/tbody/tr/td[1]");
		
		var text=await page.evaluate(element=>element.textContent,element)
		if(text=="(100)")
		{ 
			console.log(codes+" browser closed")
			browser.close()
			resolve({reply:codes})
			
		}
		else{
			resolve({reply:"false"})
		}
	 
				
				
				
				  
			
		
		
		}
		catch(hfh){
		console.log("not done "+hfh)
		browser.close()
		resolve({reply:"false"})
		}
	})
}
app.post("/get_assign",async(request,response,next)=>{
 

 
 con.query("select id,dt,count(id) as total_students,id as action from assignments group by id order by dt DESC",async(err,data)=>{

	response.json(data);
 })



})


app.get("/reports",(req,res)=>{
if(req.cookies.role=="admin"){

 res.render("allassignments");
}
else{
	res.send(401,"<h1>Unauthorized access</h1>");
}


})
app.post("/get_reportdata",urlencodedParser,(req,res)=>{
	console.log(req)
	con.query("select * from assignments,studentinfo where assignments.email=studentinfo.email and assignments.id=?",[req.body.id.trim()],(err,data)=>{
		console.log(data)
		 
res.json(data)
	
	})

})
app.post("/delyear",urlencodedParser,(req,res)=>{
  con.query("delete from years where year=?",[req.body.year.trim()],(err,result)=>{
 if(!err){
	res.redirect("/years")
 }

  })
})
app.post("/viewreport",urlencodedParser,(req,res)=>{
var id=req.body.id.trim();
con.query("select codes from assinfo where id=?",[id],(err,result)=>{
	var codes=result[0].codes.split(",");
	console.log(codes)
	res.render("report",{totalcodes:codes.length,id:id})
 
})

})

app.post("/leaderboard",urlencodedParser,(req,res)=>{
	var id=req.body.id.trim();
	con.query("select * from assignments inner join studentinfo on studentinfo.email=assignments.email and id=? order by score desc",[id],(err,result)=>{

	res.render("leaderboard",{a:result});
	})
})
app.post("/viewanalysis",urlencodedParser,async(req,res)=>{
var id=req.body.id.trim();
await con.query("SELECT count(*) as cnt,studentinfo.passout as year from assignments,studentinfo where assignments.email=studentinfo.email and assignments.id=? group by studentinfo.passout;",[id],async(err,r1)=>{

	var years=[];
	var cnt=[];
	for(var i=0;i<r1.length;i++){
		years[i]=r1[i].year;

		cnt[i]=r1[i].cnt;

	}
await con.query("SELECT count(*) as cnt,studentinfo.passout as year from assignments,studentinfo where assignments.email=studentinfo.email and assignments.id=? and assignments.score>0 group by studentinfo.passout;",[id],async(err,r2)=>{
	var years1=[];
	var cnt1=[];
	for(var i=0;i<r2.length;i++){
		years1[i]=r2[i].year;

		cnt1[i]=r2[i].cnt;

	}
	await con.query("SELECT count(*) as cnt,studentinfo.branch as year from assignments,studentinfo where assignments.email=studentinfo.email and assignments.id=? and assignments.score>0 group by studentinfo.branch;",[id],async(err,r3)=>{
		var years2=[];
		var cnt2=[];
		for(var i=0;i<r3.length;i++){
			years2[i]=r3[i].year;
	
			cnt2[i]=r3[i].cnt;
	
		}
		await con.query("SELECT count(*) as cnt,studentinfo.branch as year from assignments,studentinfo where assignments.email=studentinfo.email and assignments.id=?  group by studentinfo.branch;",[id],async(err,r4)=>{
			var years4=[];
			var cnt4=[];
			for(var i=0;i<r4.length;i++){
				years4[i]=r4[i].year;
		
				cnt4[i]=r4[i].cnt;
		
			}
	res.render('analysis',{x:({years}),y:cnt,x1:{years1},y1:cnt1,x2:{years2},y2:cnt2,x4:{years4},y4:cnt4}); 
})
	})
	
 })

}) 
})
app.post("/updateinfo",urlencodedParser,(req,res)=>{
	var name=req.body.name.trim();
	var chef=req.body.ccuser.trim();
	var yop=req.body.pyear.trim();
	
	var section=req.body.section.trim();
	var email=req.cookies.emailid;
	
		con.query("update studentinfo set fullname=?,codechefusername=?,section=?,passout=? where email=?",[name,chef,section,yop,email],(err,r)=>{
			 
			if(pass==""){
				con.query("select * from studentinfo where email=?",[email],(err,result)=>{
					console.log(result)
					res.render("accountmanage",{a:result[0]});
				})	
			}
			else{
				var pass=req.body.password.trim();
				con.query("update login set password=? where email=?",[pass,email],(err,r1)=>{
					con.query("select * from studentinfo where email=?",[email],(err,result)=>{
						console.log(result)
						res.render("accountmanage",{a:result[0]});
					})
				})
			}
		})
	 
})
app.get("/myacc",(req,res)=>{
	var email=req.cookies.emailid;
	console.log(email)
	con.query("select * from studentinfo where email=?",[email],(err,result)=>{
		console.log(result)
		res.render("accountmanage",{a:result[0]});
	})


})
app.post("/adddept",urlencodedParser,(req,res)=>{

var year=req.body.year.trim();

con.query("Select dept from years where year=?",[year],(err,rres)=>{
	res.render("adddept",{year,rres});
})


})
app.post("/adddeptreq",urlencodedParser,(a,b)=>{
	var year=a.body.year.trim();
	var dept=a.body.dept.trim();
con.query("insert into years values(?,?)",[year,dept], async(err,res)=>{

console.log(res);
if(err) {
	console.log("cp"+err)
	await con.query("select * from years where year=?",[year],async(err,rres)=>{

		console.log("cp"+rres)
	 
		b.render('adddept',{year,rres,fallback:0})
		//b.end()
	}) 
}
else{
	await con.query("select * from years where year=?",[year],async(err,rres)=>{

		console.log("cp"+rres)
	 
		b.render('adddept',{year,rres,fallback:1})
		//b.end()
	}) 

	//b.render('/years',{fallback:1})
}

})
})

app.post("/deldept",urlencodedParser,(req,res)=>{
var dept=req.body.dept.trim();
var year=req.body.year.trim();
console.log(dept+" "+year)
var q="delete from years where (year=?) and (dept=?)";
con.query(q,[year,dept],(err,resy)=>{
	console.log(resy);
	res.redirect("years");
})

})
app.post("/getyears",(req,res)=>{
	con.query("select distinct(year) from years",(err,data)=>{
		console.log(data);
		res.json(JSON.stringify(data));
	})
})
app.post("/getdept",urlencodedParser,(req,res)=>{
	con.query("select dept from years where year=?",[req.body.year.trim()],(err,data)=>{
		console.log(data);
		res.json(JSON.stringify(data));
	})
})