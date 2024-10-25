from psdi.server import MXServer
from psdi.mbo import MboConstants

mxServer = MXServer.getMXServer()

if onadd == True:
    appId = mbo.getString("APPID")
    getActiveRevisionMbo = mbo.getMboSet("getMaxActiveRevision$","MAFAPPDATA","appid = '"+str(appId)+"' and status='ACTIVE'").getMbo(0)
    if getActiveRevisionMbo is not None:
        activeRevision = getActiveRevisionMbo.getInt("revision")
        mbo.setValue("revision",(activeRevision+1),MboConstants.NOVALIDATION_AND_NOACTION)
        mbo.setValue("status","ACTIVE",MboConstants.NOVALIDATION_AND_NOACTION)
        mbo.setValue("deployby",mbo.getUserInfo().getPersonId(),MboConstants.NOVALIDATION_AND_NOACTION)
        mbo.setValue("deploydatetime",mxServer.getDate(),MboConstants.NOVALIDATION_AND_NOACTION)
        getActiveRevisionMbo.setValue("status","DISABLE",MboConstants.NOVALIDATION_AND_NOACTION)
