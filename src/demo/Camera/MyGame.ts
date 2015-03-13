module game.Camera{
    export class MyGame extends gamep.GameCycler {

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(gamep.AssetsLoaderProxy).loadAssets('preload');
            this.proxy(gamep.AssetsLoaderProxy).debug = true;
            (<gamep.CameraProxy>this.proxy(gamep.CameraProxy)).lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),1,1000);
            //(<gamep.CameraProxy>this.proxy(gamep.CameraProxy)).reset();

            //gamep.d$.select(egret_canvas_container()).transition({
            //    rotate:90
            //})

        }

    }
}
