module gp.model{
    export class AssetsLoader extends egret.EventDispatcher{

        private _ispreload:boolean;
        private _currload:number;
        private _assets_groups:any;

        public constructor(preload:string = null,groups:any = []) {
            this._assets_groups = groups;
            this._ispreload=false;
            if(preload){
                this._ispreload=true;
                this._assets_groups.unshift(preload);
            }
            trace('Ready Load Groups '+this._assets_groups);
            this._currload = 0;
            super();
            //TODO:your code here

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadProgress,this);

            RES.loadConfig('resource/resource.json','resource/');
            RES.loadGroup(this._assets_groups[this._currload]);
        }

        private loadComplete(e:RES.ResourceEvent) {
            trace(e.groupName + ' Load Complete!');
            this._currload++;
            if(this._ispreload){
                this._ispreload = false;
                trace('Pre Load Complete!');
                this.dispatchEvent(new event.AssetsEvents(event.AssetsEvents.PRELOAD_READY));
                RES.loadGroup(this._assets_groups[this._currload]);
            }else{
                if(this._currload < this._assets_groups.length){
                    RES.loadGroup(this._assets_groups[this._currload]);
                }else{
                    trace('All Load Complete!');
                    this.dispatchEvent(new event.AssetsEvents(event.AssetsEvents.ASSET_READY));
                }
            }
        }

        private loadProgress(e:RES.ResourceEvent){
            if(e.groupName!='RES__CONFIG'){
                var pct = e.itemsLoaded / e.itemsTotal;
                trace('Loading '+e.resItem.url+' in '+e.groupName+' '+pct*100+'%');
                var eve = new event.AssetsEvents(event.AssetsEvents.ASSET_PROGRESS);
                eve.percent = pct;
                this.dispatchEvent(eve);
            }
        }
    }
}
