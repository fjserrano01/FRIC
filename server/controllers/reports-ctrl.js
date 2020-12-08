const fs = require('fs')
const excel = require('exceljs')
const System = require('../models/system')
const Finding = require('../models/finding-model')
const Event = require('../models/event')
const Analyst = require('../models/analyst')
const Subtask = require('../models/subtask')
const pptxgen = require('pptxgenjs')
const docx = require("docx")
const { AlignmentType, Spacing } = require('docx')
const { text } = require('body-parser')
const { title } = require('process')
const { Document, Packer, Paragraph, TextRun, Alignment, File, HeadingLevel, StyleLevel, TableOfContents, Table, TableCell, TableRow } = docx;

//const {Alignment, Document, HeadingLevel, Media, Packer, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign} = "docx"

riskMatrixReport = async(req,res) =>{
    ids = req.body
    findings = await Finding.find({}, (err) =>{
        if(err){
            return res.status(400).json({success:false})
        }
    })
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Risk Matrix')

    worksheet.columns =[
        {header: 'ID', key: 'id'},
        {header: 'IP:PORT', key: 'ip'},
        {header: 'FINDING TYPE', key: 'type'},
        {header: 'DESCRIPTION', key: 'description'},
        {header: 'LONG DESCRIPTION', key: 'long'},
        {header: 'STATUS', key: 'status'},
        {header: 'POSTURE', key: 'posture'},
        {header: 'C', key: 'c'},
        {header: 'I', key: 'i'},
        {header: 'A', key: 'a'},
        {header: 'C', key: 'derC'},
        {header: 'I', key: 'derI'},
        {header: 'A', key: 'derA'},
        {header: 'IMP. SCORE', key: 'impScore'},
        {header: 'CAT', key: 'cat'},
        {header: 'CAT SCORE', key: 'catScore'},
        {header: 'VS (n)', key: 'vsn'},
        {header: 'VS (q)', key: 'vsq'},
        {header: 'RELEVANCE OF THREAT', key: 'threat'},
        {header: 'LIKELIHOOD', key: 'likelihood'},
        {header: 'IMPACT', key: 'impact'},
        {header: 'IMPACT RATIONALE', key: 'impactRationale'},
        {header: 'RISK', key: 'risk'},
        {header: 'MITIGATION', key: 'mitigation'},
        {header: 'ANALYST', key: 'mitigation'}
    ] 

    for(i = 0; i<findings.length; i++){
        finding = findings[i]
        worksheet.addRow(finding)
    }
    workbook.xlsx.writeFile("riskMatric.xlsx")
    .then(function(){
        console.log("file saved")
    })
    return res.status(200).json({success:true, data: findings}).catch((err) => console.log(err))
}

ERBReport = async(req,res) =>{
    let pres = new pptxgen
    let slide = pres.addSlide()

    let introTextbox = "U.S ARMY COMBAT CAPABLLITIES DEVELOPMENT COMMAND-DATA & ANALYSIS CENTER"
    let textboxOpts = { x: 1, y: 1, color: "363636" };
    slide.addText(introTextbox, textboxOpts)
    let system = await System.find({archiveStatus: false},{'_id':0, "systemName":1})
    textboxOpts2 = {x:1, y:2, color: "363636"}
    //system = JSON.stringify(eval('('+system+')'))
    //system = JSON.parse(system)
    slide.addText(system[0].systemName,textboxOpts2)
    pres.writeFile("ERB.pptx")
    let eventTitle = await Event.find({},{'_id': 0, 'eventName':1})
    eventTitle = JSON.stringify(eval('('+eventTitle+')'))
    eventTitle = JSON.parse(eventTitle)
    eventInfo = eventTitle.eventName + " "
    eventType = await Event.find({},{"_id":0,"eventType":1})
    eventType = JSON.stringify(eval('('+eventType+')'))
    eventType = JSON.parse(eventType)
    eventInfo +=eventType.eventType
    slide.addText(eventInfo,{x:1, y:3, color:"363636"})
    pres.writeFile("ERB.pptx")
    let slide2 = pres.addSlide()
    let slide2Title = "Systems assesed during the Event are as follows:"
    slide2.addText(slide2Title,textboxOpts)
    let slide2Contents =  await System.find({archiveStatus: false},{'_id':0, "systemName":1})
    slide2System =[]
    for(i = 0; i<slide2Contents.length; i++){
        slide2System += slide2Contents[i].systemName + " "
    }
    slide2.addText(slide2System,{x:1.5,y:1.3,color:"363636"})
    pres.writeFile("ERB.pptx")
    let numFinding = await Finding.count({}, (err)=>{
        if(err){
            return res.status(400).json({success:false})
        }
    })
    console.log("reading numFinding",numFinding)
    let findings = await Finding.find({archiveStatus: false}, (err) =>{
        if(err){
            return res.status(400).json({success:false})
        }
    })
    if(!numFinding){
        numFinding =2
    }
    console.log(findings)
    console.log(numFinding)
    for(i = 0; i< numFinding; i++){
        let slide = pres.addSlide()
        let rows = [
            [ 
                {text: "ID", options: {}},
                {text: i+1, options:{w:2}},
                {text:"Impact Score", options:{w:2}},
                {text: findings[i].impactLevel,options:{w:2}},
                {text:"Status", options:{w:2}},
                {text:findings[i].status,options:{w:2}},
                {text: "Posture", options:{w:2}}
            ],
            [
                {text: "Host Names", options:{}},
                {text:"IP: Port", options:{}},
                {text:"CAT", options:{w:2}},
                {text:findings[i].catValue, options:{w:2}},
                {text:"Likelihood",options:{w:2}},
                {text:findings[i].likelihood,options:{w:2}},
                {text:findings[i].posture,options:{rowspan:2}}
            ],
            [
                {text:findings[i].hostName, options:{rowspan:4}},
                {text:findings[i].ipPort,options:{rowspan:4}},
                {text:"CAT Score",options:{x:4,w:2}},
                {text:findings[i].catScore,options:{x:6,w:2}},
                {text:"Impact",options:{x:8,w:2}},
                {text:findings[i].impactLevel,options:{x:10,w:2}},
            ],
            [
                {text:"Vs_Score",options:{w:2}},
                {text:findings[i].vulnScore,options:{w:2}},
                {text:"Risk",options:{w:2}},
                {text:findings[i].risk,options:{w:2}},
                {text:"C | I | A", options:{w:2}},
            ],
            [
                {text:"VS"},
                {text:findings[i].vs},
                {text:"CM"},
                {text:findings[i].countermeasureValue},
                {text:findings[i].confidentialityImpact +" | "+ findings[i].integrityImpact+" | " + findings[i].availabilityImpact},
            ],
            [
                {text:"Impact Rationale",options:{colspan:2}},
                {text:findings[i].impactLevelDescription, options:{colspan:3}}
            ],
            [
                {text:"Type"},
                {text:findings[i].type, options:{colspan:6}}
            ],
            [
                {text:findings[i].description,options:{colspan:7}}
            ],
            [
                {text:"Description", options:{colspan:2,rowspan:3}},
                {text:findings[i].longDescription,options:{colspan:5,rowspan:3}}
            ],
            [],
            [],
            [
                {text:"Mitigation",options:{colspan:2,rowspan:3}},
                {text:findings[i].mitigaiton,options:{colspan:5,rowspan:3}}
            ],
            [],
            [],
            [
                {text:"Referances",options:{colspan:2}},
                {text:findings[i].attachment,options:{colspan:5}}
            ],
            [
                {text:"C- Confidentiality",options:{colspan:2}},
                {text:"I-Integrity",options:{colspan:2}},
                {text:"A-Avaliablitiy"},
                {text:"CM-Countermeasure",options:{colspan:2}},
            ]
        ]
        var tabOpts = {y:.65,fill:'F7F7F7', font_size:18, color:'6f9fc9', rowH:0.2, align:'center',valign:'m',border:{pt:'1', color:'f1f1f1'}}
        slide.addText("Finding Description", {x:1,y:.3,bold:true,fontSize:36,color:"363636"})
        slide.addTable(rows,tabOpts)
    }
    pres.writeFile("ERB.pptx")
    slide = pres.addSlide();
info = await Finding.count({findingRisk:"INFO"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
veryLow = await Finding.count({findingRisk:"Very Low"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
low = await Finding.count({findingRisk:"Low"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
medium = await Finding.count({findingRisk:"Medium"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
high = await Finding.count({findingRisk:"High"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
veryHigh = await Finding.count({findingRisk:"Very High"},(err)=>{
    if(err){
        return res.status(200).json({success:false})
    }
})
// Chart Type: BAR
var dataChartBar = [
  {
    name:"Risk",
    labels: ['Info', 'Very Low', 'Low', 'Medium', 'High', 'Very High'],
    values: [ 0,53, 100, 75]
  },
  {
      name:"Info",
      labels:['Info','Very Low', 'Low', 'Medium','High','Very High'],
      values:[10]
  }
];
slide.addText("Finding Histogram",{x:1,y:.3,bold:true,fontSize:36,color:"363636"})
slide.addChart( pres.charts.BAR, dataChartBar,{chartColors:['000000','ebdd42'],h:4.5,w:8,title:'Findings Risk', showTitle:true,showLegend:true});
pres.writeFile("ERB.pptx")
    return res.status(400).json({success:true})
}
finalReport = async (req,res) =>{
    systems = await System.find({},{'_id': 0})
    //systemName = JSON.stringify(eval('('+systemName+')'))
    //systemName = JSON.parse(systemName)
    events = await Event.find({},{'_id': 0})
    console.log(events[0].eventType)
    //events = JSON.stringify(eval('('+events+')'))
    //events = JSON.parse(events)
    leadAnalyst = await Analyst.find({}, {'_id': 0, "firstName":1, "lastName": 1})
    numOfFindings = await Finding.count({},(err) =>{
        if(err){
            return res.status(200).json({success:false})
        }
    }) 
    const doc = new Document({
        styles: {
            paragraphStyles:[
                {
                    id: "MySpecStyle",
                    name: "My Spectacular Style",
                    basedOn: "Heading1",
                    next: "Heading1",
                    quickFormat:true,
                    run: {
                    },
                },
            ],
        },
    })

    doc.addSection({
        properties:{},
        children:[
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Combat Capabilities Development Command (CCDC) Data & Analysis Center " + systems[0].systemName + " " + events[0].eventType + " Report",
                        bold: true,
                        size: 52
                    }),
                ],
            }),
            new Paragraph({
                children:[
                    new TextRun({
                        text: "by: " + leadAnalyst
                    })
                ]
            }),
            new Paragraph({
                children:[
                    new TextRun({
                        text:"Classified by: " + leadAnalyst
                    }),
                    new TextRun({
                        text:"Derived from: " + events.eventSecClass
                    }),
                    new TextRun({
                        text:"Declassify on: " + events.eventDeclassDate
                    }),
                ],
                spacing:{
                    line:276
                }
            })
        ],
    })
    doc.addSection({
        properties:{},
        children:[
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Destruction Notice: ",
                        bold: true,
                        pageBreakBefore: true,
                        alignment: AlignmentType.CENTER
                        
                    }),
                    new TextRun("Destroy by any method the will prevent disclosure of contents or reconstruction of the document.")
                ]
            }),
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Disclaimer: ",
                        bold:true,
                        alignment: AlignmentType.CENTER
                    }),
                    new TextRun("The findings in this report are not to be constructed as an official Department of the Army position unless so specified by other officail document.")
                ]
            }),
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Warning: ",
                        bold: true,
                        alignment: AlignmentType.CENTER
                    }),
                    new TextRun("Information and data contained in this document are based on the input available at the time of preparation.")
                ]
            }),
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Trade Names: ",
                        bold: true,
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after:120
                        },
                    }),
                    new TextRun("The use of trade names in the report does not constitute  an official  endorsement or approval of the use of such  commercial  hardware or software. The report may not be cited for purposes of advertisment.")
                ]
            }),
        ]
    })
    doc.addSection({
        properties:{},
        children:[
            new Paragraph({
                children:[
                    new TextRun({
                        text: "Combat Capabilities Development Command (CCDC) Data & Analysis Center " + systems[0].systemName + " " + events[0].eventType + " Report",
                        bold: true,
                    }),
                    new TextRun(" by Analyst 1"),
                    new TextRun(" CCDC Data & Analysis Center")
                ],
            }),
        ],
    })
    doc.addSection({
        children:[
            new TableOfContents("Table of Contents",{
                hyperlink: true,
                headingStyleRange: "1-5",
                stylesWithLevels: [new StyleLevel("MySpecStyle",1)],

            }),
            new Paragraph({
                text: "List of Figures",
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
            }),
            new Paragraph(await Subtask.find({},{"_id":0, "subtaskAttachment":1}) ),
            new Paragraph({
                text: "List of Tables",
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
            }),
            new Paragraph({
                text: "Table 1: List of Findings",
                heading: HeadingLevel.HEADING_4,
                }),
            new Paragraph({
                text:"Tables 2 - " + numOfFindings + " describe the findings in the report",
                heading: HeadingLevel.HEADING_4,
            }),
            new Paragraph({
                text: "Acknowledgements",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
                pageBreakBefore:true
            }),
            new Paragraph("The U.S. Army Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) recognizes the following individuals for their contribution to this report:"),
            new Paragraph("The Authors are: "),
            new Paragraph(leadAnalyst),
            new Paragraph("The authors wish to acknowledge the contributions of the following individuals for his/her assitance in the creation of this report"),
        ],
    })
    
    table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("ID")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Description")],
                    }),
                    new TableCell({
                        children : [new Paragraph("Likelihood")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Impact")],
                    }),
                    new TableCell({
                        children: [new Paragraph("Risk")]
                    })
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                    new TableCell({
                        children: [],
                    }),
                ],
            }),
        ],
    });
    doc.addSection({
        children:[
            new Paragraph({
                children:[
                    new TextRun({
                        text:events[0].eventType +" Findings: ",
                        bold:true,
                    }),
                    new Paragraph(table),
                    new Paragraph({
                        children:[
                        new TextRun({
                        pageBreakBefore: true
                    })
                ]
                })
                ],
            }),
        ],
    }),
    doc.addSection({
        children: [table],
    });


    Packer.toBuffer(doc).then((buffer)=>{
        fs.writeFileSync("FinalReport.docx",buffer)
    })
    return res.status(400).json({success: true})
}
module.exports ={
    riskMatrixReport,
    ERBReport,
    finalReport,
}
