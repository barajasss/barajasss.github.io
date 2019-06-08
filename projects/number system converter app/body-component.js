
Vue.component('body-component', {
	props: ['numberSystems', 'input1', 'input2', 'numberSystemPosition1', 'numberSystemPosition2'],
	template: `
		<div>
			<input-component 
				input-position = 'first'
				:number-system-position = "numberSystemPosition1"
				:number-systems="numberSystems"
				:input="input1"
				placeholder="Enter value 1"
				@update-input="$emit('update-input-2', { input: 'one', data: $event })"
				@update-number-system="$emit('update-number-system-2', { inputPosition: 'first', dir: $event })"
			></input-component>
			<input-component 
				input-position = 'second'
				:number-system-position = "numberSystemPosition2"
				:number-systems="numberSystems"
				:input="input2"
				placeholder="Enter value 2"
				@update-input="$emit('update-input-2', { input: 'two', data: $event })"
				@update-number-system="$emit('update-number-system-2', { inputPosition: 'second', dir: $event })"
			></input-component>
		</div>
	`
});
//child of body-component which is in turn child of the root vue instance of converter-app
Vue.component('input-component', {
	props: ['inputPosition', 'numberSystems', 'input', 'placeholder', 'numberSystemPosition'],
	template: `
		<div class="card-panel blue" style="padding: 10px 0px 0px 0px">
			<div class="row" style="margin: 0px">
				<button 
					class="col push-s1 offset-m1 offset-l1 s2 m2 l2 btn orange waves-effect waves-light"
					@click="updateNumberSystem('prev')"
				>
					<i class="material-icons large">chevron_left</i>
				</button>
				<div 
					id="number-system-display" 
					class="offset-s2 offset-m1 offset-l1 col s4 m4 l4 purple darken-3 container"
				>
					{{ numberSystems[numberSystemPosition] }}
				</div>
				<button 
					class="offset-s2 offset-m1 offset-l1 col pull-s1 s2 m2 l2 btn orange waves-effect waves-light"
					@click="updateNumberSystem('next')"
				>
					<i class="material-icons large">chevron_right</i>
				</button>
			</div>
			<div class="row">
				<input 
					class="col offset-s1 offset-m1 offset-l1 s10 m10 l10 white-text"
					type="text"
					:value="input"
					:placeholder="placeholder"
					@input="$emit('update-input', $event.target.value)"
				>
			</div>
		</div>
	`,
	methods: {
		updateNumberSystem: function(dir){
			this.$emit('update-number-system', dir);
		}
	}
});