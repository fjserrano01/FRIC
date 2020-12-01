const fs = require('fs')
const excel = require('exceljs')
const System = require('../models/system')
const Finding = require('../models/finding-model')
const Event = require('../models/event')
const Analyst = require('../models/analyst')
const pptxgen = require('pptxgenjs')
const docx = require("docx")
const { AlignmentType, Spacing } = require('docx')
const { Document, Packer, Paragraph, TextRun, Alignment, File, HeadingLevel, StyleLevel, TableOfContents } = docx;

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
    let system = await System.find({},{'_id':0, "systemName":1})
    textboxOpts2 = {x:1, y:3, color: "363636"}
    console.log(system)
    slide.addText(system,textboxOpts2)
    //pres.writeFile("ERB.pptx")
    let eventInfo = await Event.find({},{'_id': 0, 'title':1})
    console.log(eventInfo)
    eventInfo +=" "
    eventInfo += await Event.find({}).select("eventType")
    slide.addText(eventInfo,textboxOpts2)
    pres.writeFile("ERB.pptx")
    let slide2 = pres.addSlide()
    let slide2Title = "Systems assesed during the Event are as follows:"
    slide2.addText(slide2Title,textboxOpts)
    let slide2Contents =  await System.find({}).select("systemName")
    console.log(slide2Contents)
    for(i = 0; i < slide2Contents.length; i++){
        slide2.addText(slide2Contents)
    }
    pres.writeFile("ERB.pptx")
    ids = req.body
    numFinding = req.body.length
    for(i = 0; i< numFinding; i++){
        finding = await Finding.find({}, (err) =>{
            if(err){
                return res.status(400).json({success:false})
            }
        })
        let slide = pres.addSlide()
        let rows = [ 
            {text: "ID", options: {colW:1}}
        ]
    }
    finding = await Finding.find({}).select("_id")
    console.log(finding)

    return res.status(400).json({success:true})
}
finalReport = async (req,res) =>{
    systemName = await System.find({},{'_id': 0, 'systemName':1})
    eventType = await Event.find({},{'_id': 0, 'eventType':1})
    leadAnalyst = await Analyst.find({}, {'_id': 0, "firstName":1, "lastName": 1}) 
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
                        text: "Combat Capabilities Development Command (CCDC) Data & Analysis Center " + systemName + " " + eventType + " Report",
                        bold: true,
                        size: 52
                    }),
                    new TextRun(" by " + leadAnalyst)
                ],
            }),
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
                        text: "Combat Capabilities Development Command (CCDC) Data & Analysis Center " + systemName + " " + eventType + " Report",
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
            new Paragraph("I'm a little text very nicely written.'"),
            new Paragraph({
                text: "List of Tables",
                heading: HeadingLevel.HEADING_1,
                pageBreakBefore: true,
            }),
            new Paragraph("I'm a other text very nicely written.'"),
            new Paragraph({
                text: "Acknowledgements",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph("The U.S. Army Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) recognizes the following individuals for their contribution to this report:"),
            new Paragraph("The Authors are: "),
            new Paragraph(leadAnalyst),
            new Paragraph("The authors wish to acknowledge the contributions of the following individuals for his/her assitance in the creation of this report"),
        ],
    })

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
