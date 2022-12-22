import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class RendererService {
    public renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
}